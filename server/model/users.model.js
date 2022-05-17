const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const SALT_L = 10;
// bring dot env here
// new libraries
// validator helps validate schemas with advanced methods - for strings
const validator = require("validator");
require("dotenv").config();

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // user the validate to run a function to evaluate final value and return error if wrong
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      // create a series of values acceptable to role
      enum: ["user", "admin"],
      default: "user",
    },
    firstname: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
  //you can use collection: to give the schema another name in the database
);

// create a schema method to hash password
// always add next to the middleware cb
// async everytime you need to wait for something before moving on
// please dont use ES6 arrow function
userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_L);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } else {
    next();
  }
});

// generate token method
userSchema.methods.generateToken = function () {
  let user = this;
  const userOBJ = { _id: user._id.toHexString(), email: user.email };
  // use id because when we decode it shows what was used to create token
  // you can use an object to generate token (multiple user info)
  const token = jwt.sign(userOBJ, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

//statics method that doesnt require to know who the user is
userSchema.statics.emailTaken = async function (email) {
  const user = this;
  const existingUser = await user.findOne({ email: email });
  // convert the result into true or false
  return !!existingUser;
};

module.exports = mongoose.model("User", userSchema);
