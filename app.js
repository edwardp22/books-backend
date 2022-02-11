var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");

var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/books", booksRouter);

app.all("*", (req, res) => {
  res.statusCode = 404;
  res.send("Invalid route");
});

module.exports = app;
