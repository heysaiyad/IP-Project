const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  fine: Number,
  booksIssued: [String],
});

const User = mongoose.model("User", userData);
module.exports = User;
