const mongoose = require("mongoose");

const bookRatingSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required: true,
        },
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Users",
        //     required: true,
        // },
        isFinished: {
            type: Boolean,
            default: false,
        },
        rate: {
            type: Number,
            default: null,
        },
        process: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("BookRating", bookRatingSchema);
