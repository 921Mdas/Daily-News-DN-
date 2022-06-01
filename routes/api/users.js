const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// express router will help link this to the server
const express = require("express");
const router = express.Router();
require("dotenv").config();
const ctrl = require("../../controller/user.controller");
const { isLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const { verifyToken } = require("../../middleware/auth");

// user routes
// instead of doing router.get or router.post each time, use router.route to chain to the same url
// router.route(url).get(cb).post(cb)
router.post("/register", ctrl.registerUser);
router.post("/signin", ctrl.signIn);
router.get(
  "/profile",
  // isLoggedIn,
  // grantAccess("readOwn", "profile"),
  ctrl.userProfile
);
router.post(
  "/profile",
  // isLoggedIn,
  // grantAccess("updateOwn", "profile"),
  ctrl.updateUserProfile
);
router.post(
  "/update_email",
  // isLoggedIn,
  // grantAccess("updateOwn", "profile"),
  ctrl.updateEmail
);

router.post("/google-login", (req, res, next) => {
  ctrl.NewUser(req, res, next);
});

// a simple one to check if user is authenticated or has a valid token

router.get("/isauth", isLoggedIn, ctrl.isAuthenticated);

module.exports = router;
