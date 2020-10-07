const router = require("express").Router();
const Job = require("../model/job");
const User = require("../model/user");
const {
  findAll,
  findOne,
  postJob,
  updateJob,
  deleteJob,
  applyJob,
} = require("../controller/job");
const authMiddle = require("../middleware/auth");

router.get("/", findAll);

router.get("/:id", findOne);

router.post("/", authMiddle, postJob);

router.put("/:id", authMiddle, updateJob);

router.post("/apply", authMiddle, applyJob);

router.delete("/:id", authMiddle, deleteJob);

module.exports = router;
