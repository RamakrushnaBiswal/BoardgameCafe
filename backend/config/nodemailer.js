require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("./logger");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send newsletter subscription confirmation via email
exports.sendSubscriptionConfirmation = async (email) => {
  // Construct the email content
  const emailText = `
    Dear Customer,
    
    Thank you for subscribing to our newsletter! We're excited to have you on board.

    You will now receive regular updates about our latest boardgame collections, special offers, and upcoming events.

    If you have any questions or feedback, feel free to reach out.

    Best regards,
    PlayCafe Team
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Subscribing!",
      text: emailText,
    });
    logger.info(
      "Newsletter subscription confirmation sent successfully via email",
      { email },
    );
  } catch (error) {
    logger.error("Failed to send newsletter subscription confirmation email", {
      error,
      email,
    });
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Failed to connect to email server. Please try again later.",
      );
    } else {
      throw new Error(
        `Failed to send subscription confirmation email: ${error.message}`,
      );
    }
  }
};

// Function to send reservation confirmation via email
exports.sendReservationConfirmation = async (email, reservationDetails) => {
  const { reservationDate, guests, time } = reservationDetails;

  // Construct the email content
  const emailText = `
    Dear Customer,
    
    We are pleased to confirm your reservation. Here are the details of your reservation:

    Reservation Date: ${reservationDate}
    Number of Guests: ${guests}
    Reservation Time: ${time}
    
    Thank you for choosing our service. We look forward to hosting you.

    Best regards,
    PlayCafe
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reservation Confirmation",
      text: emailText,
    });
    logger.info("Reservation confirmation sent successfully via email", {
      email,
    });
  } catch (error) {
    logger.error("Failed to send reservation confirmation email", {
      error,
      email,
    });
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Failed to connect to email server. Please try again later.",
      );
    } else {
      throw new Error(
        `Failed to send reservation confirmation email: ${error.message}`,
      );
    }
  }
};

exports.sendVerificationMail = async (email, verificationCode) => {
  const emailText = `
    Dear Customer,
    
    Please use this verification code for resetting your password. Here's your code':

    RCode: ${verificationCode}
    
    Thank you for choosing our service. We are happy to help you.

    Best regards,
    PlayCafe
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Verification Code",
      text: emailText,
    });
    logger.info("Verification code sent successfully via email", {
      email,
    });
  } catch (error) {
    logger.error("Failed to send verification code email", {
      error,
      email,
    });
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Failed to connect to email server. Please try again later.",
      );
    } else {
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
  }
};

exports.sendRegisterVerificationMail = async (email, verificationCode) => {
  const emailText = `
  Dear Customer,
  
  Please use this verification code for verifying your account. Here's your code':

  RCode: ${verificationCode}
  
  Thank you for choosing our service. We are happy to help you.

  Best regards,
  PlayCafe
`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      text: emailText,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
