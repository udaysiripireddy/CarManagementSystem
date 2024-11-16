const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imagePaths: {
    type: [String], // Array of image URLs
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Upload', uploadSchema);
