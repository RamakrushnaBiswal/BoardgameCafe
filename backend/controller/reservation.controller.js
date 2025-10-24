const { z } = require("zod");
const Reservation = require("../models/reservation.model");
const Customer = require("../models/customer.model"); // Import Customer model
const logger = require("../config/logger");
const { sendReservationConfirmation } = require("../config/nodemailer"); // Import email function

// Define the Zod schema for reservation validation
const reservationSchema = z
  .object({
    guests: z.string(),
    date: z.string(),
    time: z.string(),
    email: z.string().email(), // Include email validation
    userId: z.string().optional(), // Make userId optional for validation
  })
  .strict(); // Disallow unknown keys

// Controller to create a reservation
async function createReservation(req, res) {
  try {
    const validationResult = reservationSchema.safeParse(req.body);

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
    const userId = req.params.id;

    const { email, date, guests, time } = validationResult.data;

    // Find the customer by userId if provided
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Create the reservation in the database with userId reference
    const reservation = await Reservation.create({
      guests,
      date,
      time,
      customer: customer._id, // Associate with customer
    });

    // Send a confirmation email
    try {
      await sendReservationConfirmation(email, {
        reservationDate: date,
        guests,
        time,
      });
      logger.info(`Reservation confirmation email sent to ${email}`);
    } catch (emailError) {
      logger.error("Error sending reservation confirmation email:", {
        message: emailError.message,
      });
      // Email error does not block reservation creation
    }

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    logger.error("Error creating reservation:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });

    res.status(500).json({
      success: false,
      message: "An error occurred while creating the reservation",
    });
  }
}

// Controller to fetch all reservations for a specific user
async function fetchUserReservations(req, res) {
  try {
    const userId = req.params.id; // Extract user ID from route parameters

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find all reservations associated with the customer
    const reservations = await Reservation.find({ customer: userId }).populate(
      "customer",
      "name email",
    );

    if (reservations.length === 0) {
      logger.info(`No reservations found for user ID: ${userId}`);
      return res.status(404).json({
        success: false,
        message: "No reservations found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reservations retrieved successfully.",
      data: reservations,
    });
  } catch (error) {
    logger.error("Error fetching user reservations:", {
      message: error.message,
      stack: error.stack,
      userId: req.params.id,
    });

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching reservations.",
    });
  }
}

module.exports = {
  createReservation,
  fetchUserReservations,
};
