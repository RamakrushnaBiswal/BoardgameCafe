const logger = require("../config/logger");
const Customer = require("../models/customer.model");
const Event = require("../models/events.model");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, ageRange, image } = req.body;

    // Input validation
    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      ageRange,
      image,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    logger.error("Error creating event:", error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Invalid input data", details: error.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.query.id; // Change to req.query.id
    console.log(eventId);
    const event = await Event.findById(eventId); // Remove the object wrapper

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted " });
  } catch (error) {
    logger.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(204).send(); // No Content
    }

    res.status(200).json(events);
  } catch (error) {
    logger.error("Error retrieving events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bookEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user;

  try {
    // Check if eventId is provided
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the user and check if they have already booked this event
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the event is already booked
    const isAlreadyBooked = customer.bookedEvents.some(
      (bookedEvent) => bookedEvent.toString() === eventId,
    );

    if (isAlreadyBooked) {
      return res.status(400).json({ message: "Event already booked" });
    }

    // Add the event to the user's bookedEvents array
    customer.bookedEvents.push(eventId);
    await customer.save();

    res.status(200).json({
      message: "Event successfully booked",
      bookedEvent: event,
    });
  } catch (error) {
    console.error("Error booking event:", error);
    res
      .status(500)
      .json({ message: "Internal server error while booking event" });
  }
};

const getBookedEvents = async (req, res) => {
  const { id } = req.user;

  try {
    // Find the customer by ID and populate the bookedEvents field with event details
    const customer = await Customer.findById(id).populate("bookedEvents");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      bookedEvents: customer.bookedEvents,
    });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching booked events" });
  }
};
module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  getBookedEvents,
  bookEvent,
};
