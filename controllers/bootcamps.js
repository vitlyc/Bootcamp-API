const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/assync");
//@descr Get all bootcamps
//@route GET /api/v1/bootcamps
//@acess Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@descr Get single bootcamp
//@route GET /api/v1/bootcamp/:id
//@acess Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@descr Create single bootcamps
//@route POST /api/v1/bootcamps/:id
//@acess Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@descr Update single bootcamps
//@route PUT /api/v1/bootcamps/:id
//@acess Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@descr Delete single bootcamps
//@route DELETE /api/v1/bootcamps/:id
//@acess Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
