const booksModel = require("../models/booksModel");

const getAll = async (req, res) => {
  const books = await booksModel.getAll(req);

  return res.json(books);
};

const getBook = async (req, res) => {
  const book = await booksModel.getBook(req);

  return res.json(book);
};

const createBook = async (req, res) => {
  const result = await booksModel.createBook(req, res);

  return res.json(result);
};

module.exports = {
  getAll,
  getBook,
  createBook,
};
