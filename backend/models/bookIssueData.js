const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const BookIssueData = new mongoose.Schema({
  bookName: String,
  issuedTo: String,
  issuersId: ObjectId,
  issueData: Date,
  returnDate: Date,
});

const BookIssue = new mongoose.model("BookIssue", BookIssueData);
module.exports = BookIssue;
