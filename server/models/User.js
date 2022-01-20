const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  pwd: {
    type: String,
  },
  favorites: {
    type: Array,
  },
});

module.exports = mongoose.model("users", userSchema);
