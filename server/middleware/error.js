const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  console.log(err.name);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    err = new ErrorHandler(message, err.statusCode);
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    err = new ErrorHandler(message, err.statusCode);
  }

  res.status(err.statusCode).json({
    type: "Internal error",
    status: "error",
    message: err.message,
  });
};
