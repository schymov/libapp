const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model("books", bookSchema); //check users
