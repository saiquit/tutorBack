const {
  District,
  Area,
  Group,
  Institute,
  Category,
  Course,
} = require("../model/static");
const { errorHandler } = require("../services/response");

exports.getAllDistrict = async (req, res) => {
  try {
    const districts = await District.find({});
    res.status(200).json(districts);
  } catch (error) {
    errorHandler(error);
  }
};

exports.getSingleArea = async (req, res) => {
  try {
    const area = await Area.find({ district_id: req.params.id });
    res.status(200).json(area);
  } catch (error) {
    errorHandler(error);
  }
};

exports.getAllArea = async (req, res) => {
  try {
    const areas = await Area.find({});
    res.status(200).json(areas);
  } catch (error) {
    errorHandler(error);
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const group = await Group.find({});
    res.status(200).json(group);
  } catch (error) {
    errorHandler(error);
  }
};

exports.getAllInstitutes = async (req, res) => {
  try {
    const institute = await Institute.find({});
    res.status(200).json(institute);
  } catch (error) {
    errorHandler(error);
  }
};
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      category_name: req.params.category_name,
    });
    res.status(200).json(category);
  } catch (error) {
    errorHandler(error);
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json(course);
  } catch (error) {
    errorHandler(error);
  }
};
exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ class_name: req.params.name });
    res.status(200).json(course);
  } catch (error) {
    errorHandler(error);
  }
};
