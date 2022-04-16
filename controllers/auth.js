const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/assync");
const geocoder = require("../utils/geocoder");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //  sendTokenResponse(user, 200, res);
  res.status(200).json({ success: true });
});
