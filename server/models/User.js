const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  pwd: {
    type: String,
  },
  favorites: {
    employee: [String],
    default: [],
  }
});

module.exports = mongoose.model("user", userSchema);
