const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

// const Course = require("../models/Course");

router.route("/").get(getCourses);

module.exports = router;
