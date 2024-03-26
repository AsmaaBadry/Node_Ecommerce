
const express = require("express");
const router = express.Router();
const { auth, restrictTo } = require("../middleware/auth");
const orderController = require("../controllers/orders");

router.post("/", auth, orderController.createOrder);
router.get("/:orderId", auth, orderController.getOrder);
router.put("/:orderId", auth, orderController.updateOrder);
router.delete("/:orderId", auth, orderController.deleteOrder);

module.exports = router;
