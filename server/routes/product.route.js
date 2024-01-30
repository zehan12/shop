const express = require("express");
const {
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
} = require("../controllers/product.controller");

const productRouter = express.Router();

// @route   POST api/products
// @desc    Create a new product
// @access  Public
productRouter.post("/", handleCreateProduct);

// @route   GET api/products
// @desc    Get all products
// @access  Public
productRouter.get("/", handleGetAllProducts);

// @route   PUT api/products/:id
// @desc    Update a product by ID
// @access  Public
productRouter.put("/:id", handleUpdateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product by ID
// @access  Public
productRouter.delete("/:id", handleDeleteProduct);

module.exports = productRouter;
