const validateId = require("../middlewares/validate-id");

const { getDb } = require("./connection");

const getAll = async (req) => {
  const page = req.query.p || 0;
  const booksPerPage = 10;

  let books = [];

  await getDb()
    .collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => {
      books.push(book);
    });

  return books;
};

const getBook = async (req) => {
  const id = req.params.id;
  validateId(id);

  const book = await getDb().collection("books").findOne({ _id: id });

  return book;
};

const createBook = async (req, res) => {
  const book = req.body;
  const result = await getDb().collection("books").insertOne(book);

  return result;
};

module.exports = {
  getAll,
  getBook,
  createBook,
};
