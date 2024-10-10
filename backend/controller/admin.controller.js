const bcrypt = require("bcrypt");
const { z } = require("zod");
const Admin = require("../models/admin.model");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");

// Define the schema
const adminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

async function createAdmin(req, res) {
  // Validate the request body
  const validation = adminSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const existingAdmin = await Admin.findOne({ email: req.body.email });
  if (existingAdmin) {
    return res.status(409).json({ error: "Email is already registered" });
    return res.status(409).json({ error: "Email is already registered" });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    logger.error("Error creating admin:", {
      message: error.message,
    });
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginAdmin(req, res) {


  const adminLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  // Validate the request body
  const validation = adminLoginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "Login successful",
      token,
      role: "admin",
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    logger.error("Error logging in admin:", {
      message: error.message,
    });
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createAdmin, loginAdmin };
