const ErrorResponse = require("../utils/errorResponse");

function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  console.log(err.name);

  //Mongoose bad ObjectID
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value";
    error = new ErrorResponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
}
module.exports = errorHandler;
