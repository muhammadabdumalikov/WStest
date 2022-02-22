const mongoose = require("mongoose");

const categoryBookModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        icon: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Categories", categoryBookModel);
