const express = require("express");

const { validate } = require("./middlewares/validate");
const {
  bookIdSchema,
  createBookSchema,
  getAllSchema,
  updateBookSchema,
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

router.get("/books/:id", validate(bookIdSchema), getBook);

router.post("/books", validate(createBookSchema), createBook);

router.delete("/books/:id", validate(bookIdSchema), deleteBook);

router.patch("/books/:id", validate(updateBookSchema), updateBook);

module.exports = router;
