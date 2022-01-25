const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  pwd: {
    type: String,
  },
  favorites: [],
});

module.exports = mongoose.model("users", userSchema);
