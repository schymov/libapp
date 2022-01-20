const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

const keys = require("./config/keys");
const signin = require("./routes/signin");
const signup = require("./routes/signup");
const books = require("./routes/books");

app.get("/", (req, res) => {
  res.send("server started!");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

mongoose
    .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use("/auth/signin", signin);
app.use("/auth/signup", signup);
app.use("/lib/books", books);

module.exports = app;
