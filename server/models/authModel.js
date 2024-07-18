const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is  required field"],
  },
  email: {
    type: String,
    required: [true, "Email is  required field"],
  },
  password: {
    type: String,
    required: [true, "Password is  required field"],
  },
});
const authModel = mongoose.model("users", authSchema);

module.exports = authModel;
