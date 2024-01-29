const { Product } = require("../models");
const ErrorHandler = require("../utils/errorHandler");

// create a product by admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product, message: "Product created" });
  } catch (err) {
    return next(new ErrorHandler(err.message));
  }
  
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product is created.",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
};

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (err) {
    return next(new ErrorHandler(err.message));
  }
};
