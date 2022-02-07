const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  birthdate: {
    type: String,
    },
  gender: {
    type: String
  },
  avatar: {
    type: String
  },
  pwd: {
    type: String,
  },
  favorites: [],
});

module.exports = mongoose.model("users", userSchema);
