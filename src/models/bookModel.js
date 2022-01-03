const mongoose = require("mongoose");
const { permitted } = require("../config/enums");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [{ type: String, enum: permitted }],
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: null,
  },
  students: {
    type: Number,
    required: true,
    default: 0,
  },
  sections: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Books", bookSchema);
