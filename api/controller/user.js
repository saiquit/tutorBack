const bcrypt = require("bcryptjs");
const User = require("../model/user");

exports.createUser = async (req, res, next) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      new Error("Email Already Exist");
      res.status(400).json({
        message: "Email Already Exist",
      });
    }

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        const data = req.body;
        const user = await User.create({ ...data, password: hashedPassword });
        res.status(201).json(user._doc);
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error,
    });
    next();
  }
};
