const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: String,
  issueDate: Date,
  returnDate: Date,
});

const userData = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  fine: Number,
  booksIssued: [bookSchema],
});

const User = mongoose.model("User", userData);
module.exports = User;
