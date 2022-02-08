const mongoose = require("mongoose");

const bookRatingSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    rate: {
      type: Number,
      default: null,
    },
    process: {
      type: Number,
      default: null,
    },
    bookmark: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookRating", bookRatingSchema);
