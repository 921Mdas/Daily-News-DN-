const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// express router will help link this to the server
const express = require("express");
const router = express.Router();
require("dotenv").config();
const ctrl = require("../../controller/user.controller");

// user routes
// instead of doing router.get or router.post each time, use router.route to chain to the same url
// router.route(url).get(cb).post(cb)
router.post("/register", ctrl.registerUser);

module.exports = router;
