const catchAsync = require("../middleware/catchAsync");
const { Product } = require("../models");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create a product by admin
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product, message: "Product created" });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
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
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});

// get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const resultPrePage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPrePage);

  const product = await apiFeature.query;
  return res.status(200).json({product,productCount});
});
