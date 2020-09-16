const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      new Error("No Email Exist");
      res.status(404).json({
        message: "No Email Exist",
      });
    }
    const userExist = await bcrypt.compare(password, user.password);
    if (userExist) {
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) {
            res.json({
              message: "Unauthorize",
            });
          }
          res.json({
            token: token,
            _id: user._id,
          });
        },
      );
    } else {
      res.status(404).json({
        message: "No User Found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
