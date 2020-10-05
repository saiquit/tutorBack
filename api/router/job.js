const router = require("express").Router();
const Job = require("../model/job");
const User = require("../model/user");
const {
  findAll,
  findOne,
  postJob,
  updateJob,
  deleteJob,
} = require("../controller/job");
const authMiddle = require("../middleware/auth");

router.get("/", findAll);

router.get("/:id", findOne);

router.post("/", authMiddle, postJob);

router.put("/:id", authMiddle, updateJob);

router.post("/apply", authMiddle, async (req, res) => {
  const jobId = req.body.jobId;
  const foundJob = await Job.findById(jobId);
  const isApplied = foundJob?.applied.filter(
    (data) => data.applicatentId == req.body.applicatentId,
  );
  if (!isApplied || !isApplied.length) {
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        $push: { applied: { ...req.body } },
      },
      { upsert: true },
    );
    res.status(201).json({ message: "Applied" });
  } else {
    res.status(409).json({
      message: "Already Applied",
    });
  }
});

router.delete("/:id", authMiddle, deleteJob);

module.exports = router;
