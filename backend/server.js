const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userData");
const Admin = require("./models/adminData");
const Books = require("./models/booksData");
const IssuedBooks = require("./models/bookIssueData");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const DB_URI =
  "mongodb+srv://sameervohra943:vlC6UXKTVSfnvTxI@cluster0.s4okptn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((error) => console.log(`Error: ${error}`));

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .send("Authorization required for this action to be performed");
  }
  try {
    req.user = jwt.verify(token.split(" ")[1], "SECRET_KEY");
    next();
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
}

app.post("/add-user", verifyToken, async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existingUser) {
      return res.status(409).send("User Already Exists");
    }
    const newUser = new User({
      name,
      email,
      mobile,
      fine: 0,
      booksIssued: [],
    });
    await newUser.save();
    console.log(newUser);
    return res.status(201).send("User Successfully Created");
  } catch (error) {
    console.error(error);
    return res.status(501).send("Internal Server Error");
  }
});

app.get("/qr-data", async (req, res) => {
  const { email } = req.query;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) return res.status(404).send("User Not Found");
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
});

app.post("/add-admin", verifyToken, async (req, res) => {
  const { adminId, name, email, mobile, address } = req.body;
  try {
    const admin = new Admin({
      adminId,
      name,
      email,
      mobile,
      address,
    });
    await admin.save();
    return res.status(201).send("New Admin Created Successfully");
  } catch (error) {
    return res.status(501).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  const { adminId, name, email, mobile } = req.body;
  try {
    if (!adminId || !name || !email || !mobile) {
      return res.status(401).send("All fields are required");
    } else {
      const adminData = await Admin.findOne({ adminId });
      if (
        !adminData ||
        adminId != adminData.adminId ||
        name != adminData.name ||
        email != adminData.email ||
        mobile != adminData.mobile
      ) {
        return res.status(404).send("User not found");
      } else {
        const token = jwt.sign({ adminId: adminData.adminId }, "SECRET_KEY");
        return res.status(201).send({ token, adminData });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(501).send("Internal Server Error");
  }
});

app.post("/add-books", verifyToken, async (req, res) => {
  const { bookName, author, genre, quantity } = req.body;
  try {
    if (!bookName || !author || !genre || !quantity) {
      return res.status(401).send("All fields are required");
    }
    const isAdded = await Books.findOne({ bookName });
    if (isAdded) {
      isAdded.quantity += parseInt(quantity);
      await isAdded.save();
    } else {
      const newBook = new Books({
        bookName,
        author,
        genre,
        quantity,
      });
      await newBook.save();
    }

    return res.status(201).send("Book Data Saved Successfully");
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
});

app.get("/:bookName/book-data", async (req, res) => {
  const bookName = req.params;
  try {
    const book = await Books.findOne(bookName);
    if (!book) {
      res.status(404).send("Book Not Found");
    }
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal server error");
  }
});

app.post("/:id/issue-book", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { bookName } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    const book = await Books.findOne({ bookName });
    if (!user) {
      return res.status(404).send("No such user");
    }
    if (book && book.quantity >= 1) {
      if (user.booksIssued.some((book) => book.name === bookName)) {
        res.status(401).send("Book already Issued");
      } else {
        const issueDate = new Date();
        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 20);
        book.quantity--;

        const newIssuedBook = new IssuedBooks({
          bookName: bookName,
          issuedTo: user.name,
          issuersId: user._id,
          issueDate: issueDate,
        });

        user.booksIssued.push({
          name: bookName,
          issueDate: issueDate,
          returnDate: returnDate,
        });

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
  const { bookName, id } = req.body;
  try {
    const book = await Books.findOne({ bookName });
    const user = await User.findOne({ _id: id });
    const bookIssued = await IssuedBooks.findOne({
      bookName,
      issuersId: id,
    });

    if (
      user &&
      user.booksIssued.some((issuedBook) => issuedBook.name === bookName)
    ) {
      user.booksIssued = user.booksIssued.filter(
        (issuedBook) => issuedBook.name !== bookName,
      );

      book.quantity++;

      const today = new Date();
      const returnDate = new Date(bookIssued.returnDate);
      console.log(returnDate);
      const overdueDays = Math.floor((today - returnDate) / (1000 * 3600 * 24));
      const fine = overdueDays > 0 ? overdueDays * 100 : 0;

      user.fine += fine;

      await user.save();
      await book.save();

      await IssuedBooks.deleteOne({
        bookName: bookName,
        issuersId: id,
      });

      return res
        .status(200)
        .json({ message: "Book returned successfully", fine: fine });
    } else {
      return res
        .status(404)
        .json({ message: "No such book issued to this user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
app.get("/display-users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.get("/:id/userInfo", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

app.get("/:adminId/admin-info", verifyToken, async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).send("No Admin Found");
    res.status(201).send(admin);
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
});
