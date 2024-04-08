const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const userData = require("./schema/userData.js");
const adminData = require("./schema/adminData.js");

const app = express();
const port = 3000;
const dbUri = "mongodb://localhost:27017/LibraryManagement";
mongoose.connect(dbUri);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
  console.log("hello world");
});

app.post("/register", async (req, res) => {
  console.log("/register called");
  try {
    const user = new userData({
      username: req.body.name,
      email: req.body.email,
      number: req.body.number,
    });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/createAdmin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new adminData({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).send("Admin Successfully Created");
  } catch (error) {
    res.status(500).send("Error Creating Admin");
  }
});

app.listen(port, () => {
  console.log(`Connection Established listening to ${port}`);
});
