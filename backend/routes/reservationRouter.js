const express = require("express");
const {
  createReservation,
  fetchUserReservations,
} = require("../controller/reservation.controller");
const authenticateCustomer = require("../middlewares/authCustomer");
const router = express.Router();

router.post("/create/:id", authenticateCustomer, createReservation);
router.get("/get/:id", authenticateCustomer, fetchUserReservations);
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the restaurant reservation API!",
    version: "1.0.0",
    endpoints: {
      createReservation: "/create [POST]",
    },
    documentation: "https://api-docs-url.com",
  });
});

module.exports = router;
