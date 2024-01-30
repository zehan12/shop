const catchAsync = require("../middleware/catchAsync");
const { Product } = require("../models");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

/**
 * @desc      Create a new product by admin
 * @param     {Object} req - Request object
 * @param     {Object} res - Response object
 * @returns   {JSON} - A JSON object representing the created product and a success message
 */
const handleCreateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product, message: "Product created" });
});

/**
 * @desc      Update a product by ID
 * @param     {Object} req - Request object
 * @param     {Object} res - Response object
 * @param     {Function} next - Next middleware function
 * @returns   {JSON} - A JSON object representing a success message
 */
const handleUpdateProduct = catchAsync(async (req, res, next) => {
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

/**
 * @desc      Delete a product by ID
 * @param     {Object} req - Request object
 * @param     {Object} res - Response object
 * @param     {Function} next - Next middleware function
 * @returns   {JSON} - A JSON object representing a success message
 */
const handleDeleteProduct = catchAsync(async (req, res, next) => {
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

/**
 * @desc      Get all products
 * @param     {Object} req - Request object
 * @param     {Object} res - Response object
 * @param     {Function} next - Next middleware function
 * @returns   {JSON} - A JSON object representing the list of products and the count
 */
const handleGetAllProducts = catchAsync(async (req, res, next) => {
  const resultPrePage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPrePage);

  const product = await apiFeature.query;
  return res.status(200).json({ product, productCount });
});

module.exports = {
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
};
