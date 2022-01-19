const mongoose = require("mongoose");
const { permitted } = require("../config/enums");

const bookSchema = new mongoose.Schema({
  title: {
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
    type: [{ type: String }],
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: {
    type: Number,
    default: null,
  },
  students: {
    type: Number,
    default: 0,
  },
  sections: {
    type: Number,
    required: true,
    default: 1,
  },
  bookmark: {
    type: Boolean,
    default: false,
  },
  category: {
    type: [{ type: String, enum: permitted }],
  },
});

module.exports = mongoose.model("Books", bookSchema);