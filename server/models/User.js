const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  login: {
    type: String,
  },
  pwd: {
    type: Number,
  },
});

module.exports = mongoose.model("user", Schema);
