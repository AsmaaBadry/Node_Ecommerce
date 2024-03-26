
const express = require("express");
const router = express.Router();
const { auth, restrictTo } = require("../middleware/auth");
const userController = require("../controllers/users");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/", auth, userController.updateUser);
router.delete("/", auth, restrictTo('Admin', 'User'), userController.deleteUser);

module.exports = router;
