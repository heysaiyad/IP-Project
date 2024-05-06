const mongoose = require("mongoose");
const BooksData = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
  quantity: Number,
  booksId: [String],
});

const Books = mongoose.model("Books", BooksData);
module.exports = Books;
