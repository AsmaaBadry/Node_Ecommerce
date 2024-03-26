const express = require("express");
const { createProduct, getTheSellerProducts,getOneProduct, editOneProduct, deleteProduct, searchProductsByproductName, searchProductsBySeller } = require("../controllers/products");
const router = express.Router();
const { auth, restrictTo } = require("../middleware/auth");

router.post("/", auth, restrictTo('Admin', 'Seller'), createProduct);
router.get("/", auth, restrictTo('Admin', 'Seller'), getTheSellerProducts);
router.get("/:productName", restrictTo('Admin', 'Seller', 'User'), searchProductsByproductName);
router.get("/:seller", restrictTo('Admin', 'Seller', 'User'), searchProductsBySeller);


router.get("/:id", restrictTo('Admin', 'Seller'), getOneProduct);
router.put("/:id", auth, restrictTo('Admin', 'Seller'), editOneProduct);
router.delete("/:id", auth, restrictTo('Admin', 'Seller'), deleteProduct);

module.exports = router;