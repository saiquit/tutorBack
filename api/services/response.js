const router = require("express").Router();
exports.errorHandler = (error) => {
  console.log(error);
  res.status(500).json({
    message: error,
  });
};
