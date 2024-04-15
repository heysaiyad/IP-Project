const mongoose = require("mongoose");

const adminData = new mongoose.Schema({
  adminId: Number,
  name: String,
  email: String,
  mobile: Number,
});

const Admin = mongoose.model("Admin", adminData);
module.exports = Admin;
