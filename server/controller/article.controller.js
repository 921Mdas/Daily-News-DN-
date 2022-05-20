const e = require("express");
const { StatusCodes } = require("http-status-codes");
const Article = require("../model/article.model");

const addArticle = async (req, res, next) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      score: req.body.score,
      director: req.body.director,
      actors: req.body.actors,
      status: req.body.status
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
        _id: articleID
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

module.exports = {
  addArticle,
  readArticle,
  deleteArticle,
  updateArticle,
  getPublicArticles
};
