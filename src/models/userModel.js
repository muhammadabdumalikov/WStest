const mongoose = require("mongoose");
const { permitted } = require("../config/enums");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            default: null,
            trim: true,
        },
        age: {
            from: {
                type: Number,
            },
            to: {
                type: Number,
            },
        },
        region: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        interests: {
            type: [{ type: String, enum: permitted }],
        },
        verified: {
            type: Boolean,
            default: false,
        },
        sessions: {
            type: [{ type: String }],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", userSchema);
