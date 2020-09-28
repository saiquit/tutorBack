const Job = require("../model/job");
const User = require("../model/user");
const { errorHandler } = require("../services/response");

exports.findAll = async (req, res) => {
  try {
    const reqQuery = req.query;

    const queryLength = Object.keys(reqQuery).length;
    if (!queryLength) {
      const job = await Job.find();
      res.status(200).json(job);
    } else {
      const job = await Job.find({
        ...reqQuery,
        district: reqQuery?.district[0],
      });
      res.status(200).json(job);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.postJob = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdJob = await Job.create({
      ...reqBody,
      createdBy: req.userId,
    });
    res.status(200).json(createdJob);
    if (createdJob) {
      return User.findByIdAndUpdate(
        { _id: req.userId },
        { $push: { postedJobs: createdJob._id } },
      );
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const reqBody = req.body;
    const userId = req.userId;
    await Job.findByIdAndUpdate(
      userId,
      reqBody,
      { new: true },
      (err, result) => {
        if (result) {
          res.status(202).json(result);
        }
      },
    );
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deletedData = await Job.findOneAndDelete({
      createdBy: req.userId,
      _id: req.params.id,
    });
    res.status(200).json({
      message: ` Successfully Deleted ${deletedData._id}`,
    });
  } catch (error) {
    errorHandler(error);
  }
};
