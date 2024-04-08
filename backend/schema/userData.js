const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userDataSchema);
