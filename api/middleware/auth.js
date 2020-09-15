const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({
      message: "Unauthorize",
    });
  } else {
    const tokenBody = token.split(" ")[1];
    jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("JWT ERR", err);
        return res.status(401).json({
          message: "Unauthorize",
        });
      }
      req.userId = decode._id;
      next();
    });
  }
};
