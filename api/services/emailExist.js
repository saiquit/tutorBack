const User = require("../model/user");

exports.emailExist = async (email) => {
  await User.findOne({ email: email });
  if (emailExist) {
    new Error("Email Already Exist");
    res.status(400).json({
      message: "Email Already Exist",
    });
    return true;
  }
};
