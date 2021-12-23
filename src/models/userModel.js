const mongoose = require("mongoose");
const { permitted } = require("../config/enums");

const userSchema = new mongoose.Schema({
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
    type: String,
  },
  region: {
    type: String,
    trim: true,
  },
  interests: {
    type: [{ type: String, enum: permitted }],
  },
});

module.exports = mongoose.model("Users", userSchema);
