const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    console.log(err,"here it")
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({
    error: true,
    message: err.message,
  });
};
