const router = require("express").Router();
const {
  District,
  Area,
  Group,
  Institute,
  Category,
  Course,
} = require("../model/static");
const { errorHandler } = require("../services/response");
const {
  getAllDistrict,
  getSingleDistrict,
  getAllArea,
  getAllGroups,
  getAllInstitutes,
  getAllCategories,
  getAllCourses,
  getSingleCourse,
} = require("../controller/static");

router.get("/district", getAllDistrict);

router.get("/district/:id", getSingleDistrict);

router.get("/area", getAllArea);

router.get("/group", getAllGroups);

router.get("/institute", getAllInstitutes);

router.get("/category", getAllCategories);

router.get("/course", getAllCourses);

router.get("/course/:name", getSingleCourse);

module.exports = router;
