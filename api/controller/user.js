const bcrypt = require("bcryptjs");
const User = require("../model/user");
const Job = require("../model/job");
const { errorHandler } = require("../services/response");

exports.createUser = async (req, res, next) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      new Error("Email Already Exist");
      res.status(400).json({
        message: "Email Already Exist",
      });
    }

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        const data = req.body;
        const user = await User.create({ ...data, password: hashedPassword });
        res.status(201).json(user._doc);
      });
    });
  } catch (error) {
    errorHandler(error);
    next();
  }
};

exports.findMe = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404).json({
      message: "No User Found",
    });
  }
  const jobs = await Job.find({ _id: { $in: user.postedJobs } });
  res.status(200).json({
    ...user._doc,
    password: null,
    postedJobs: jobs,
  });
};
