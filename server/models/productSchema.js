const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Enter product description"],
    },
    price: { type: Number, required: [true, "Enter product price"] },
    rating: { type: Number, default: 0 },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Enter product category"],
    },
    stock: {
      type: String,
      required: [true, "Enter stock quantity"],
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Product", productSchema);
