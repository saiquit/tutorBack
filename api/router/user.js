const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authMiddle = require("../middleware/auth");
const User = require("../model/user");
const { createUser, findMe } = require("../controller/user");

router.post("/", createUser);
router.get("/me", authMiddle, findMe);

module.exports = router;
