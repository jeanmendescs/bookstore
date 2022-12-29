const booksModel = require("../models/booksModel");

const getAll = async (request, response) => {
  const books = await booksModel.getAll(request);

  return response.json(books);
};

module.exports = {
  getAll,
};
