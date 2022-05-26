const express = require("express");
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
      status: req.body.status,
    });
    const producedArticle = await article;
    // console.log("created article", producedArticle);
    return res.status(StatusCodes.OK).send(producedArticle);
  } catch (err) {
    if (err) console.log(err);
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

const deleteArticle = (req, res, next) => {
  const articleID = req.params.id;
  try {
    Article.findByIdAndRemove({ _id: articleID }, (err, doc) => {
      if (err) throw err;
      return res.status(StatusCodes.OK).send(`article deleted`);
    });
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const updateArticle = async (req, res, next) => {
  const articleID = req.params.id;

  try {
    const article = await Article.findOneAndUpdate(
      {
        _id: articleID,
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
    return res.status(StatusCodes.OK).send(article);
  } catch (err) {
    if (err) return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// load initial content - check √
const loadMore = async (req, res, next) => {
  try {
    //   {sortBy:"_id",order:"asc", limit:10}
    let sortArgs = sortArgsHelper(req.body.params.num);

    const article = await Article.find({ status: "public" })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    if (!article || article.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    }
    return res.status(StatusCodes.OK).json(article);
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
      sort: { _id: "desc" },
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
  paginate,
};
