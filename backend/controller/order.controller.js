const Customer = require("../models/customer.model");
const Order = require("../models/order.model");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const customerId = req.params.id.trim();

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "Customer ID is required." });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = new Order({
      customer: customerId,
      items,
      totalAmount,
    });

    const savedOrder = await order.save();

    await Customer.findByIdAndUpdate(customerId, {
      $push: { orders: savedOrder._id },
    });

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders for a customer
exports.getOrders = async (req, res) => {
  try {
    const customerId = req.params.id.trim();

    const orders = await Order.find({ customer: customerId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const customerId = req.params.id.trim();

    const order = await Order.findOne({ _id: orderId, customer: customerId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await Order.deleteOne({ _id: orderId });
    await Customer.findByIdAndUpdate(customerId, {
      $pull: { orders: orderId },
    });

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
