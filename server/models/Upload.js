const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  uploadPath: { type: String, required: true },
});

module.exports = mongoose.model("Upload", imageSchema);
