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
  const body = await booksModel.createBook(req);

  return res.json(body);
};

const deleteBook = async (req, res) => {
  const body = await booksModel.deleteBook(req);

  return res.json(body);
};

const updateBook = async (req, res) => {
  const updatedBook = await booksModel.updateBook(req);

  return res.json(updatedBook);
};

module.exports = {
  getAll,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
