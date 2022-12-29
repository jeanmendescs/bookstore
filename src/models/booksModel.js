const { ObjectId } = require("mongodb");

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
  if (!ObjectId.isValid(req.params.id)) {
    return { error: "Not a valid doc id" };
  }

  const book = await getDb()
    .collection("books")
    .findOne({ _id: ObjectId(req.params.id) });

  return book;
};

module.exports = {
  getAll,
  getBook,
};
