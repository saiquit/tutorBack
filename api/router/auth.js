const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { auth } = require("../controller/auth");
const dotenv = require("dotenv").config();

router.post("/", auth);

module.exports = router;
