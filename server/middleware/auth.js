const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

exports.verifyToken = async function (req, res, next) {
  // first send cookie before verifying

  try {
    if (req.headers["tokenauth"]) {
      const accessToken = req.headers["tokenauth"];
      const { _id, email } = jwt.verify(accessToken, process.env.DB_SECRET);
      // if the verification is good it will give back all the component used to create the token id, email, etc.
      // we can then store this information inside a res.local.whaterver available later
      res.locals.userData = await User.findById(_id);

      next();
    } else {
      next();
    }
  } catch (error) {
    console.log("failed to form token", error);
    if (error)
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "bad token", error: error });
  }
};

exports.isLoggedIn = (req, res, next) => {
  const user = res.locals.userData;
  req.user = user;
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "not logged in" });
  }
  next();
};
