const mongoose = require("mongoose");
const BookIssueData = new mongoose.Schema({
  bookName: String,
  issuedTo: String,
  issuersId: Number,
  issueData: Date,
  returnDate: Date,
});

const BookIssue = new mongoose.model("BookIssue", BookIssueData);
module.exports = BookIssue;
