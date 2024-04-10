const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userData");
const Admin = require("./models/adminData");
const app = express();
app.use(express.json());
const DB_URI =
  "mongodb+srv://sameervohra943:vlC6UXKTVSfnvTxI@cluster0.s4okptn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((error) => console.log(`Error: ${error}`));

app.post("/add-user", async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const user = new User({
      name,
      email,
      mobile,
      booksIssued: [],
    });
    await user.save();
    return res.status(201).send("User Successfully Created");
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.post("/add-admin", async (req, res) => {
  const { adminId, name, email, mobile } = req.body;
  try {
    const admin = new Admin({
      adminId,
      name,
      email,
      mobile,
    });
    await admin.save();
    return res.status(201).send("Admin Created Successfully");
  } catch (error) {
    return res.status(501).send("Internal server error");
  }
});

app.get("/login", async (req, res) => {
  const { adminId, name, email, mobile } = req.body;
  const adminData = await Admin.findOne({ adminId });
  console.log(adminData);
  try {
    if (!adminId || !name || !email || !mobile) {
      return res.status(401).send("All fields are required");
    } else {
      if (
        adminId != adminData.adminId ||
        name != adminData.name ||
        email != adminData.email ||
        mobile != adminData.mobile
      ) {
        return res.status(404).send("User not found");
      } else {
        return res.status(201).send(adminData).send("user found ");
      }
    }
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`Listening to ${port}`);
});
