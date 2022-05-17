const User = require("../model/users.model");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res, next) => {
  try {
    // 2. check if email is taken > create another method on the userSchema
    if (await User.emailTaken(req.body.email)) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "email taken" });
    }
    // 1.creating the model (hash password) in model
    // note you can handpick what to register first and complete later on the profile

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    // 3. generate token - user password + secret in the model
    const token = newUser.generateToken();

    res
      .cookie("authToken", token)
      .status(StatusCodes.ACCEPTED)
      .send(parseUserDetails(newUser));
  } catch (err) {
    if (err) console.log("something happened", err);
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ messsage: "couldnt save user.controller 18", error: err });
  }
  // send email
  // save...send token with cookie
};

const parseUserDetails = function (user) {
  return {
    id: user._id,
    email: user.email,
  };
};

module.exports = {
  registerUser,
};
