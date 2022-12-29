const express = require("express");
const { ObjectId } = require("mongodb");

const { getDb } = require("./models/connection");
const {
  getAll,
  getBook,
  createBook,
} = require("./controllers/booksController");

const router = express.Router();

router.get("/books", getAll);

router.get("/books/:id", getBook);

router.post("/books", createBook);

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
