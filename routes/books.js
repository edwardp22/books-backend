var express = require("express");
var router = express.Router();

var books = require("../db.js");
let booksIndex = [];
books.forEach((book, index) => booksIndex[book.id] = index);

/* GET books listing. */
router.get("/", (req, res, next) => {
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(books);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* Create book. */
router.post("/", (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      req.body.id = books.length
        ? Math.max(...books.map((book) => book.id)) + 1
        : 1;
      books.push(req.body);
      booksIndex[req.body.id] = books.length - 1;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(books);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* Put book. */
router.put("/:id", (req, res, next) => {
  try {
    const rowIndex = booksIndex[+req.params.id];

    if (rowIndex !== -1 && Object.keys(req.body).length !== 0) {
      books.splice(rowIndex, 1, req.body);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(books);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* Delete book. */
router.delete("/:id", (req, res, next) => {
  try {
    const rowIndex = booksIndex[+req.params.id];

    if (rowIndex !== -1) {
      books.splice(rowIndex, 1);
      booksIndex.splice(+req.params.id, 1)
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(books);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

module.exports = router;
