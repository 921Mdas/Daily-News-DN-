<<<<<<< HEAD
const e = require("express");
=======
const express = require("express");
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
const { StatusCodes } = require("http-status-codes");
const Article = require("../model/article.model");
const { sortArgsHelper } = require("../config/helper");
const { options } = require("../routes/api/articles");
const { Aggregate } = require("mongoose");

const addArticle = async (req, res, next) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      score: req.body.score,
      director: req.body.director,
      actors: req.body.actors,
<<<<<<< HEAD
      status: req.body.status
=======
      status: req.body.status,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    });
    const producedArticle = await article;
    res.status(StatusCodes.OK).json(producedArticle);
  } catch (err) {
    if (err) res.status(StatusCodes.NOT_ACCEPTABLE).json(err);
  }
};

const readArticle = async (req, res, next) => {
  const articleID = req.params.id;
  try {
    const article = await Article.findById(articleID);

    if (!article) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ err: "article not found" });
    }
    return res.status(StatusCodes.OK).json(article);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const deleteArticle = async (req, res, next) => {
  const articleID = req.params.id;
  try {
    const article = await Article.deleteOne({ _id: articleID });
    return res.status(StatusCodes.OK).send(`article deleted`);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const updateArticle = async (req, res, next) => {
  const articleID = req.params.id;

  try {
    const article = await Article.findOneAndUpdate(
      {
<<<<<<< HEAD
        _id: articleID
=======
        _id: articleID,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
      },
      { $set: req.body },
      { new: true }
    );
    return res.status(StatusCodes.OK).send(`${article.title} updated`);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// fetching articles by status
const getPublicArticles = async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await Article.find({ _id: id, status: "public" });
    if (!article || article.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    }
    res.status(StatusCodes.OK).send(article);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// load initial content
const loadMore = async (req, res, next) => {
  try {
    //   {sortBy:"_id",order:"asc", limit:10}
<<<<<<< HEAD
    let sortArgs = sortArgsHelper(req.body);

    const article = await Article.find({ status: "public" })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);
=======
    // let sortArgs = sortArgsHelper(req.body);

    const article = await Article.find({ status: "public" });
    //   .sort([[sortArgs.sortBy, sortArgs.order]])
    //   .skip(sortArgs.skip)
    //   .limit(sortArgs.limit);
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41

    if (!article || article.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    }
<<<<<<< HEAD
    res.status(StatusCodes.OK).send(article);
=======
    res.status(StatusCodes.OK).json(article);
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// pagination

const paginate = async (req, res, next) => {
  try {
    const limit = req.body.limit ? req.body.limit : 5;
    // we can use features to search through the database
    // const aggregateQuery = Article.aggregate([
    //   //   { $match: { status: "draft" } }/
    //   { $match: { title: { $regex: /ps5/ } } }
    // ]);
    const aggregateQuery = Article.aggregate();
    const options = {
      page: req.body.page,
      limit: limit,
<<<<<<< HEAD
      sort: { _id: "desc" }
=======
      sort: { _id: "desc" },
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    };
    const articles = await Article.aggregatePaginate(aggregateQuery, options);

    return res.status(StatusCodes.OK).json(articles);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

module.exports = {
  addArticle,
  readArticle,
  deleteArticle,
  updateArticle,
  getPublicArticles,
  loadMore,
<<<<<<< HEAD
  paginate
=======
  paginate,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
};
