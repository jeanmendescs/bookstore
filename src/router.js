const express = require("express");

const {
  getAll,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("./controllers/booksController");

const router = express.Router();

router.get("/books", getAll);

router.get("/books/:id", getBook);

router.post("/books", createBook);

router.delete("/books/:id", deleteBook);

router.patch("/books/:id", updateBook);

module.exports = router;
