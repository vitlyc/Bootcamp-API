//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@acess Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

//@desc Get single bootcamp
//@route GET /api/v1/bootcamp/:id
//@acess Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show  bootcamp ${req.params.id}` });
};

//@desc Create single bootcamps
//@route POST /api/v1/bootcamps/:id
//@acess Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new bootcamp" });
};

//@desc Update single bootcamps
//@route PUT /api/v1/bootcamps/:id
//@acess Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

//@desc Delete single bootcamps
//@route DELETE /api/v1/bootcamps/:id
//@acess Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
