const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/assync");
const geocoder = require("../utils/geocoder");

//@descr Get all bootcamps
//@route GET /api/v1/bootcamps
//@acess Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select"];
  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  console.log(reqQuery);

  //Create query string
  let queryStr = JSON.stringify(reqQuery);
  //Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  //Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //Esecuting query
  const bootcamps = await query;
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

//@descr Get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@acess Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  console.log(radius);
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
