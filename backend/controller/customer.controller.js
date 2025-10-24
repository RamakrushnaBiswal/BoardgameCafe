/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { z } = require("zod");
const Customer = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const { sendRegisterVerificationMail } = require("../config/nodemailer");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Define the schema
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

async function createCustomer(req, res) {
  const validation = customerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const existingCustomer = await Customer.findOne({ email: req.body.email });
  if (existingCustomer) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

    // Support file coming from multipart form (express-fileupload -> req.files)
    // or from a JSON payload (req.body.file). Be defensive: only try to upload
    // when we actually have a file-like value.
    const fileFromFiles = req.files && (req.files.file || req.files.image);
    const fileFromBody = req.body && Object.prototype.hasOwnProperty.call(req.body, 'file') ? req.body.file : undefined;

    let fileComming = false;
    let thumbnailImage;

    // Prefer file from multipart parser (req.files). If present and valid, upload.
    const fileData = fileFromFiles || fileFromBody || null;
    if (fileData && fileData !== '') {
      fileComming = true;
      // Upload the Thumbnail to Cloudinary. The uploader util handles
      // both uploaded temp files (file.tempFilePath) and raw data strings.
      thumbnailImage = await uploadImageToCloudinary(
        fileData,
        process.env.FOLDER_NAME,
      );
      console.log('Uploaded thumbnail:', thumbnailImage?.secure_url);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
  profilePicture: fileComming ? thumbnailImage.secure_url : null,
    });
    await customer.save();

    await sendRegisterVerificationMail(req.body.email, otp);

    res.status(201).json({
      message: "OTP sent to your email. Verify to complete registration.",
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer || customer.isVerified) {
      return res
        .status(400)
        .json({ error: "Invalid request or already verified" });
    }

    if (customer.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (new Date() > customer.otpExpiry) {
      return res
        .status(400)
        .json({ error: "OTP expired. Please register again." });
    }

    customer.isVerified = true;
    customer.otp = undefined;
    customer.otpExpiry = undefined;
    await customer.save();

    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginCustomer(req, res) {
  const customerLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rememberMe: z.boolean().optional(),
  });

  const validation = customerLoginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  try {
    const { email, password, rememberMe } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (!customer.isVerified) {
      return res
        .status(403)
        .json({ error: "Account not verified. Please verify your email." });
    }

    const validPassword = await bcrypt.compare(password, customer.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      sub: customer._id,
      name: customer.name,
      role: "customer",
      email: customer.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "1h", // Set token expiry based on rememberMe option
    });

    res.cookie("authToken", token, {
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 days or 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      message: "Login successful",
      token,
      role: "customer",
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: "customer",
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  const customerResetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  // Validate the request body
  const validation = customerResetPasswordSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    customer.password = hashedPassword;
    await customer.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCustomerDetail(req, res) {
  const { id } = req.user;

  try {
    // Find user by ID and populate related fields if needed
    const user = await Customer.findById(id)
      .populate("bookedEvents") // Populate booked events if needed
      .populate("orders") // Populate orders if needed
      .populate("reservations") // Populate reservations if needed
      .select("-password -verificationCode -otp"); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }
    res.send("Logged out successfully!");
  });
}

module.exports = {
  createCustomer,
  loginCustomer,
  resetPassword,
  logout,
  verifyOtp,
  getCustomerDetail,
};
