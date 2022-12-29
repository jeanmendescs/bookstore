const booksModel = require("../models/booksModel");

const getAll = async (req, res) => {
  const books = await booksModel.getAll(req);

  return res.json(books);
};

const getBook = async (req, res) => {
  const book = await booksModel.getBook(req);

  return res.json(book);
};

module.exports = {
  getAll,
  getBook,
};
