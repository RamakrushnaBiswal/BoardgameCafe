const NewsletterEmail = require("../models/newsletter.model");
const { sendSubscriptionConfirmation } = require("../config/nodemailer");
const logger = require("../config/logger");

// Controller for handling newsletter subscriptions
exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Check if the email already exists in the database
    const existingEmail = await NewsletterEmail.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "This email is already subscribed." });
    }

    // Save the email to the database
    const newEmail = new NewsletterEmail({ email });
    await newEmail.save();

    try {
      await sendSubscriptionConfirmation(email);
    } catch (error) {
      logger.error("Error sending confirmation email:", error);
      return res.status(500).json({
        error:
          "Subscription successful, but there was an error sending the confirmation email.",
      });
    }

    return res.status(201).json({
      message: "Subscription successful! A confirmation email has been sent.",
    });
  } catch (error) {
    logger.error("Error subscribing to newsletter:", error);
    return res
      .status(500)
      .json({ error: "Error subscribing to the newsletter." });
  }
};
