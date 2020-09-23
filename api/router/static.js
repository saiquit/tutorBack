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
  getSingleArea,
  getAllArea,
  getAllGroups,
  getAllInstitutes,
  getCategory,
  getAllCourses,
  getSingleCourse,
} = require("../controller/static");

router.get("/district", getAllDistrict);

router.get("/area/:id", getSingleArea);

router.get("/area", getAllArea);

router.get("/group", getAllGroups);

router.get("/institute", getAllInstitutes);

router.get("/category/:category_name", getCategory);

router.get("/course", getAllCourses);

router.get("/course/:name", getSingleCourse);

module.exports = router;
