const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// express router will help link this to the server
const express = require("express");
const router = express.Router();
const ctrl = require("../../controller/article.controller");
require("dotenv").config();
const { isLoggedIn, verifyToken } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

router.post(
  "/admin/addarticles",
  // verifyToken,
  // isLoggedIn,
  // grantAccess("createOwn", "article"),
  ctrl.addArticle
);

router.get(
  "/admin/:id",
  // isLoggedIn,
  // grantAccess("readOwn", "article"),
  ctrl.readArticle
);

router.post(
  "/admin/like/:id",
  // isLoggedIn,
  // grantAccess("readOwn", "article"),
  ctrl.likeArticle
);
router.get(
  "/admin/like/:id",
  // isLoggedIn,
  // grantAccess("readOwn", "article"),
  ctrl.getLikedArticle
);

router.post(
  "/admin/delete/:id",
  // isLoggedIn,
  // grantAccess("deleteOwn", "article"),
  ctrl.deleteArticle
);

router.post(
  "/admin/:id/update",
  // isLoggedIn,
  // grantAccess("updateOwn", "article"),
  ctrl.updateArticle
);

// fetching articles by status without
router.get("/status/:id", ctrl.getPublicArticles);

// load more content initially
// <<<< go back
// router.get("/loadmore", ctrl.loadMore);
router.post("/loadmore", ctrl.loadMore);

// get all articles
router.get("/content", ctrl.getArticles);

// pagination
router.post(
  "/admin/paginate",
  // isLoggedIn,
  // grantAccess("readAny", "article"),
  ctrl.paginate
);

module.exports = router;
