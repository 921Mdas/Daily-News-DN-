const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// express router will help link this to the server
const express = require("express");
const router = express.Router();
const ctrl = require("../../controller/article.controller");
require("dotenv").config();
const { isLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

router.post(
  "/admin/addarticles",
  isLoggedIn,
  grantAccess("createOwn", "article"),
  ctrl.addArticle
);

router.get(
  "/admin/:id",
  isLoggedIn,
  grantAccess("readOwn", "article"),
  ctrl.readArticle
);

router.post(
  "/admin/:id/delete",
  isLoggedIn,
  grantAccess("deleteOwn", "article"),
  ctrl.deleteArticle
);

router.post(
  "/admin/:id/update",
  isLoggedIn,
  grantAccess("updateOwn", "article"),
  ctrl.updateArticle
);

// fetching articles by status without
router.get("/status/:id", ctrl.getPublicArticles);

// load more content initially
<<<<<<< HEAD
router.post("/loadmore", ctrl.loadMore);
=======
router.get("/loadmore", ctrl.loadMore);
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41

// pagination
router.post(
  "/admin/paginate",
  isLoggedIn,
  grantAccess("readAny", "article"),
  ctrl.paginate
);

module.exports = router;
