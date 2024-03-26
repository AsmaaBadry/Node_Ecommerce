const Product = require("../models/products");

const createProduct = async (req, res) => {
  try {
    const { name, description, photo } = req.body;
    const product = await Product.create({ name, description, photo, seller: req.userId });
    res.status(201).json({ product });

  } catch (error) {

     res.status(400).json({ message: error.message });
  }
};

const getTheSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, photo } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: req.userId },
      { name, description, photo },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "SORRY!! You are not allowed to see this Product" });
    }
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: productId, seller: req.userId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "SORRY!! You are not allowed to see this Product" });
    }
    res.json({ message: "DONE! This Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchProductsByProductName = async (req, res) => {
  try {
    const { productName } = req.params;

    // Search by product name (case-insensitive) with partial match
    const products = await Product.find({
      name: { $regex: productName, $options: 'i' },
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found with that name." });
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchProductsBySeller = async (req, res) => {
  try {
    const { seller } = req.params; 

    const products = await Product.find({ seller }); 

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this seller." });
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createProduct, getTheSellerProducts, editOneProduct, deleteProduct, getOneProduct, searchProductsByProductName, searchProductsBySeller };