const express = require("express");
const logger = require("../config/logger"); // Import your Winston logger
require("dotenv").config();

const router = express.Router();

let feedbackRouter;

try {
  feedbackRouter = require("./feedbackRouter");
} catch (error) {
  logger.error("Error loading feedbackRouter:", error); // Log the error with Winston
  feedbackRouter = (req, res) => {
    res
      .status(500)
      .json({ error: "Feedback functionality is currently unavailable" });
  };
}

let eventRouter;
try {
  eventRouter = require("./eventRouter");
} catch (error) {
  logger.error("Error loading eventRouter:", error); // Log the error with Winston
  eventRouter = (req, res) => {
    res
      .status(500)
      .json({ error: "Event functionality is currently unavailable" });
  };
}

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the restaurant API!",
    version: "1.0.0",
    endpoints: {
      Reservation: "/reservation",
      Feedback: "/feedback", // Added feedback endpoint documentation
    },
    documentation: "https://api-docs-url.com",
  });
});

router.use("/event", eventRouter);
router.use("/admin", require("./adminRouter"));
router.use("/feedback", feedbackRouter);
router.use("/user", require("./customerRouter"));
router.use("/reservation", require("./reservationRouter"));
router.use("/newsletter", require("./newsletterRoute"));
router.use("/forgot", require("./forgotRouter"));
router.use("/order", require("./orderRouter"));

module.exports = router;
