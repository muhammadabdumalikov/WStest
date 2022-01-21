const mongoose = require("mongoose");
const { permitted } = require("../config/enums");

const bookSchema = new mongoose.Schema(
  {
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
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
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
    rate: {
      type: Number,
      default: null,
    },
    process: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
