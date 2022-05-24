const User = require("../model/users.model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const registerUser = async (req, res, next) => {
  try {
    // 2. check if email is taken > create another method on the userSchema
    if (await User.emailTaken(req.body.email)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "email taken" });
    }
    // 1.creating the model (hash password) in model
    // note you can handpick what to register first and complete later on the profile

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    // 3. generate token - user password + secret in the model
    const token = newUser.generateToken();
    // parsed user detail
    const createdUser = parseUserDetails(newUser);
    // data sent back to client
    const data = {
      token,
      createdUser,
    };

    return res.status(StatusCodes.OK).send(data);
  } catch (err) {
    if (err) console.log("something happened", err);
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ messsage: "couldnt save user.controller 18", error: err });
  }
  // send email
  // save...send token with cookie
};

const signIn = async (req, res, next) => {
  // first find the user
  const isAUser = await User.findOne({ email: req.body.email });

  if (isAUser === null || isAUser === undefined) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "user doesn't exist, sign up" });
  }

  // second compare the password
  const compare = await isAUser.comparePassword(req.body.password);

  if (await compare) {
    // if password match, generate the token
    const token = await isAUser.generateToken();
    const AuthUser = await parseUserDetails(isAUser);

    // response
    const userDataAuth = {
      token,
      AuthUser,
    };

    return res
      .cookie("tokenAuth", token)
      .status(StatusCodes.OK)
      .send(userDataAuth);
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "wrong password" });
  }
};

const userProfile = async (req, res, next) => {
  const user = res.locals.userData;

  try {
    const userFound = await User.findById(user._id);
    const permission = res.locals.permission;

    if (!userFound) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user not found" });
    }
    // return res.status(StatusCodes.ACCEPTED);
    // .json({ email: userFound.email, id: userFound._id });
    return res
      .status(StatusCodes.ACCEPTED)
      .json(permission.filter(userFound._doc));
    // can use permission filtering edit the roles config to decide what to send back
  } catch (err) {
    console.log(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
        },
      },
      {
        new: true,
      }
    );

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user not found, register" });
    return res.status(StatusCodes.ACCEPTED).json(parseUserDetails(updatedUser));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ message: "couldnt update user info, check permission" });
  }
};

// update email and passwords

const updateEmail = async (req, res, next) => {
  //  is the email taken?
  if (await User.emailTaken(req.body.newEmail)) {
    // if yes return error
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ message: "email taken" });
  }

  // if not find that email and update
  const userToUpdate = await User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        email: req.body.newEmail,
      },
    },
    {
      new: true,
    }
  );

  if (!userToUpdate) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "can't update user, doesnt exist" });
  }

  // generate a new token? it is built containing the new information that was just passed to the db
  // uses that to generate and now we can reuse that information from the token and send new email back
  const token = await userToUpdate.generateToken();
  res
    .cookie("authToken", token)
    .status(StatusCodes.ACCEPTED)
    .send({ email: userToUpdate.email });
};

// helper functions

const isAuthenticated = async (req, res) => {
  res.status(StatusCodes.OK).send(parseUserDetails(req.user));
};

const parseUserDetails = function (user) {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  registerUser,
  signIn,
  userProfile,
  updateUserProfile,
  isAuthenticated,
  updateEmail,
};
