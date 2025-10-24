const express = require("express");
const {
  createOrder,
  getOrders,
  deleteOrder,
} = require("../controller/order.controller.js");
const sessionMiddleware = require("../middlewares/sessionMiddleware.js");

const router = express.Router();

router.post("/create/:id", sessionMiddleware, createOrder);
router.get("/get/:id", sessionMiddleware, getOrders);
router.delete("/delete/:id", sessionMiddleware, deleteOrder);

module.exports = router;
