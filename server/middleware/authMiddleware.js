const jwt = require("jsonwebtoken");
import authModel from "../models/authModel";

exports.checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const { userId } = jwt.verify(token, "thisIsSecretStringForToken");

      req.user = await authModel.findById(userId).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: error.message });
  }
};
