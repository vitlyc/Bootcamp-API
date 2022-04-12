const ErrorResponse = require("../utils/errorResponse");

function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  console.log(err.stack.red);

  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
}
module.exports = errorHandler;
