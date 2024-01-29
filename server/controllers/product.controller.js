const { Product } = require("../models");

// create a product by admin
exports.createProduct = async (req, res, next) => {
  console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({ product,message:"Product created" });
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findById(id);

  if (!product) {
    return res.status(500).json({
      success: false,
      error: "Product not found",
    });
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
    return res.status(500).json({
      success: false,
      error: "Product not found",
    });
  }


  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
};

// get all products
exports.getAllProducts = async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json(product);
};
