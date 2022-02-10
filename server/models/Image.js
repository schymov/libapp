const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    userId: { type: String, required: true },
    imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);