const express = require("express");

const router = express.Router();

const { ObjectId } = require("mongodb");
const { getDb } = require("./models/connection/connection");

router.get("/books", (req, res) => {
  const page = req.query.p || 0;
  const booksPerPage = 3;

  let books = [];

  getDb()
    .collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

router.get("/books/:id", (req, res) => {
  // current page

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ error: "Not a valid doc id" });
  }

  getDb()
    .collection("books")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

router.post("/books", (req, res) => {
  const book = req.body;

  getDb()
    .collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

router.delete("/books/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ error: "Not a valid doc id" });
  }

  getDb()
    .collection("books")
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not delete the document" });
    });
});

router.patch("/books/:id", (req, res) => {
  const updates = req.body;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ error: "Not a valid doc id" });
  }

  getDb()
    .collection("books")
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not update the document" });
    });
});

module.exports = router;
