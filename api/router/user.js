const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authMiddle = require("../middleware/auth");
const User = require("../model/user");
const { createUser, findMe, updateData } = require("../controller/user");

router.post("/", createUser);
router.get("/me", authMiddle, findMe);
router.put("/:id", authMiddle, updateData);

module.exports = router;
