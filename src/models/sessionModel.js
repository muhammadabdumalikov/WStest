const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        session_user_device: {
            type: String,
            enum: ["Android", "IOS", "others"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Sessions", sessionSchema);
