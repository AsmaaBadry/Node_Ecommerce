// orderController.js

const Order = require("../models/orders");

const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await Order.create({ product: productId, quantity, buyer: req.userId });
    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;
    const options = { new: true }; // To return the updated order
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, options);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrder, updateOrder, deleteOrder };
