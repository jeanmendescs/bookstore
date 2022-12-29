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

module.exports = {
  getAll,
};
