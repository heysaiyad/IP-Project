const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  booksIssued: [String],
});

const User = mongoose.model("User", userData);
module.exports = User;
