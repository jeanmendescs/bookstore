const express = require("express");

const { validate } = require("./middlewares/validate");
const {
  updateBookSchema,
  getAllSchema,
  getBookSchema,
} = require("./middlewares/booksSchema");

const {
  getAll,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("./controllers/booksController");

const router = express.Router();

router.get("/books", validate(getAllSchema), getAll);

router.get("/books/:id", validate(getBookSchema), getBook);

router.post("/books", createBook);

router.delete("/books/:id", deleteBook);

router.patch("/books/:id", validate(updateBookSchema), updateBook);

module.exports = router;
