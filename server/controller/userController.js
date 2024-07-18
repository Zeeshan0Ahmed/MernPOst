const authModel = require("../models/authModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.userRegistration = async (req, resp) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const isUser = await authModel.findOne({ email: email });
      if (!isUser) {
        // password hashing
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        const newUser = await authModel.create({
          username,
          email,
          password: hashedPassword,
        });
        if (newUser) {
          return resp
            .status(200)
            .json({ message: "User Registeration Successfully" });
        }
      } else {
        return resp.status(400).json({ message: "Email Already Exists" });
      }
    } else {
      return resp.status(400).json({ message: "all fields are required" });
    }
  } catch (error) {
    return resp.status(400).json({ message: error.message });
  }
};
exports.userLogin = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const isEmail = await authModel.findOne({ email: email });
    if (isEmail) {
      if (isEmail.email === email && bcryptjs(password, isEmail.password)) {
        // Generate Token
        const token = jwt.sign(
          { userId: isEmail._id },
          "thisIsSecretStringForToken",
          {
            expiresIn: "1d",
          }
        );
        return resp.status(200).json({
          message: "LogIn Successfully",
          token,
          username: isEmail.username,
        });
      } else {
        return resp.status(400).json({ message: "wrong credentials" });
      }
    } else {
      return resp.status(400).json({ message: "Email is Not Found" });
    }
  } catch (error) {
    return resp.status(400).json({ message: error.message });
  }
};
