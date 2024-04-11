const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userData");
const Admin = require("./models/adminData");
const Books = require("./models/booksData");
const IssuedBooks = require("./models/bookIssueData");
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
    return res.status(201).send("New Admin Created Successfully");
  } catch (error) {
    return res.status(501).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
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

app.post("/add-books", async (req, res) => {
  const { bookName, author, genre, quantity } = req.body;
  try {
    if (!bookName || !author || !genre || !quantity) {
      return res.status(401).send("All fields are required");
    }
    const newBook = new Books({
      bookName,
      author,
      genre,
      quantity,
    });
    await newBook.save();
    return res.status(201).send("Book Data Saved Successfully");
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.post("/issue-books", async (req, res) => {
  const { mobile, bookName } = req.body;
  try {
    const user = await User.findOne({ mobile });
    const book = await Books.findOne({ bookName });
    if (book && book.quantity >= 1) {
      if (user.booksIssued.includes(bookName)) {
        return res.status(401).send("Book already Issued");
      } else {
        user.booksIssued.push(bookName);
        book.quantity--;

        const newIssuedBook = new IssuedBooks({
          bookName: bookName,
          issuedTo: user.name,
          issuerNumber: mobile,
          issueDate: new Date().getDate(),
        });

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 25);
        newIssuedBook.returnDate = returnDate;

        await user.save();
        await book.save();
        await newIssuedBook.save();

        return res.status(200).send(`Book issued left with ${book.quantity}`);
      }
    } else {
      return res.status(404).send("No Such Book");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/return-book", async (req, res) => {
  const { bookName, mobile } = req.body;
  try {
    const book = await Books.findOne({ bookName });
    const user = await User.findOne({ mobile });
    if (user && user.booksIssued.includes(bookName)) {
      user.booksIssued = user.booksIssued.filter((book) => book !== bookName);
      book.quantity++;
      await user.save();
      await book.save();
      return res.status(201).json({ user });
    } else {
      return res.status(404).json({ message: "No such book or user" });
    }
  } catch (error) {
    return res.status(501).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
