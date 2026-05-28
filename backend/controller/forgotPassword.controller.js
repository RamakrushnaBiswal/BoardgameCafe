/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const { z } = require("zod");
const Customer = require("../models/customer.model");
const { sendVerificationMail }  = require("../config/nodemailer");


// Define the schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

async function verifyEmail(req, res) {
  // Validate the request body
  const validation = forgotPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const existingCustomer = await Customer.findOne({ email: req.body.email });
  if (!existingCustomer) {
    return res.status(404).json({ error: "Email is not registered" });
  }

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  existingCustomer.verificationCode = verifyCode;
  await existingCustomer.save();

  try {
    await sendVerificationMail(req.body.email, verifyCode);
    res.status(201).json({ id: existingCustomer._id, success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyOTP(req, res) {
    try {
        const { id, otp } = req.body;
    
        const existingCustomer = await Customer.findOne({ _id: id });
    
        if (!existingCustomer) {
            return res.status(404).json({ error: "User not found" });
        }
    
        if(existingCustomer.verificationCode !== otp){
            return res.status(400).json({ error: "Invalid verification code", success: false });
        }
    
        existingCustomer.verificationCode = ""
        await existingCustomer.save();

        return res.status(200).json({ message: "verified", success: true})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false})
    }


}

async function resetPassword(req, res) {
  try {
    const {id, password} = req.body
  
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      return res.status(401).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    customer.password = hashedPassword;
    await customer.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(501).json({ error: "Internal server error" });
  }
}

module.exports = {
  verifyEmail,
  verifyOTP,
  resetPassword,
};
