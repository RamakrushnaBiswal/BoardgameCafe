const { z } = require("zod");
const { Feedback } = require("../models/feedback.model");
const logger = require("../config/logger");
const nodemailer = require("nodemailer");

const feedbackSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  feedback: z.string().min(10),
  rating: z.number().min(1).max(5),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function createFeedback(req, res) {
  try {
    const validationResult = feedbackSchema.safeParse(req.body);

    if (!validationResult.success) {
      logger.error("Validation error:", {
        errors: validationResult.error.errors,
        body: req.body,
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors,
      });
    }

    const feedback = await Feedback.create(validationResult.data);

    await sendThankYouEmail(feedback);

    res.status(201).json({
      success: true,
      message: "Feedback created successfully and email sent",
      data: feedback,
    });
  } catch (error) {
    logger.error("Error creating feedback:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the feedback",
    });
  }
}

async function sendThankYouEmail(feedback) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: feedback.email, // Receiver email
    subject: "Thank you for your feedback!",
    text: `Hi ${feedback.name},

Thank you for your valuable feedback. Here are the details:

- Feedback: ${feedback.feedback}
- Rating: ${feedback.rating}/5

We appreciate you taking the time to share your thoughts with us!

Best regards,
Play Cafe`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Thank-you email sent to ${feedback.email}`);
  } catch (error) {
    logger.error("Error sending email:", error);
  }
}

module.exports = {
  createFeedback,
};
