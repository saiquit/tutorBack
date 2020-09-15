const express = require("express");
const bcrypt = require("bcryptjs");
const authMiddle = require("../middleware/auth");
const router = express.Router();
const User = require("../model/user");
const { createUser } = require("../controller/user");

router.post("/", createUser);
router.get("/me", authMiddle, (req, res) => {
  res.send("Working");
});

module.exports = router;
