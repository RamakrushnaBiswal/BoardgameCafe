const express = require("express");
const logger = require("../config/logger");
const { createEvent, getEvents, deleteEvent } = require("../controller/event.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      message: "Welcome to the event API!",
      version: "1.0.0",
      endpoints: {
        CreateEvent: "/event/create",
        GetEvents: "/event/all",
      },
      documentation: "https://api-docs-url.com",
    });
  } catch (error) {
    logger.error("Error in /event route:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/create", createEvent);
router.get("/all", getEvents);
router.get("/delete", deleteEvent);

module.exports = router;
