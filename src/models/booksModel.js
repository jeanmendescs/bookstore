const { ObjectId } = require("mongodb");

const { validateId } = require("../middlewares/validate-id");
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

  const book = await getDb()
    .collection("books")
    .findOne({ _id: ObjectId(id) });

  return book;
};

const createBook = async (req) => {
  const book = req.body;
  return await getDb().collection("books").insertOne(book);
};

const deleteBook = async (req) => {
  const id = req.params.id;
  validateId(id);

  return await getDb()
    .collection("books")
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getBook,
  createBook,
  deleteBook,
};
