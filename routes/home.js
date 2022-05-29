const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// express router will help link this to the server
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("welcome home");
});

module.exports = router;
