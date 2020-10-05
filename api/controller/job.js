const Job = require("../model/job");
const User = require("../model/user");
const { errorHandler } = require("../services/response");

exports.findAll = async (req, res) => {
  var limit = parseInt(7);
  var skip = (parseInt(req.query.page) - 1) * parseInt(limit);
  try {
    const reqQuery = req.query;
    delete reqQuery.page;

    const queryLength = Object.keys(reqQuery).length;
    if (!queryLength) {
      const jobs = await Job.find().select("-applied").limit(limit).skip(skip);
      const count = await Job.countDocuments();
      return res.status(200).json({
        jobs,
        count: count,
      });
    } else if (reqQuery.district) {
      const count = await Job.find({
        ...reqQuery,
        district: reqQuery?.district[0],
      }).count();

      const jobs = await Job.find({
        ...reqQuery,
        district: reqQuery?.district[0],
      })
        .limit(limit)
        .skip(skip);
      delete jobs.applied;
      res.status(200).json({
        jobs,
        count: count,
      });
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
    const jobId = req.params.id;
    await Job.findByIdAndUpdate(
      jobId,
      reqBody,
      { upsert: true },
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
