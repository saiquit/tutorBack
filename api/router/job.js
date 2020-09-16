const router = require("express").Router();
const Job = require("../model/job");
const User = require("../model/user");
const authMiddle = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const job = await Job.find({}).populate("createdBy");
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", authMiddle, async (req, res) => {
  try {
    const reqBody = req.body;

    const createdJob = await Job.create({
      ...reqBody,
      createdBy: req.userId,
    });
    if (createdJob) {
      User.findByIdAndUpdate(
        { _id: req.userId },
        { $push: { postedJobs: createdJob._id } },
      );
    }
    res.status(200).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
