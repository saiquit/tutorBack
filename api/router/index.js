const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const staticRouter = require("./static");
const jobRouter = require("./job");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/statics", staticRouter);
router.use("/jobs", jobRouter);

module.exports = router;
