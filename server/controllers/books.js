const Book = require("../models/Book");
const errorHandler = require("../utils/error-handler");

module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: "Books not found" });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
