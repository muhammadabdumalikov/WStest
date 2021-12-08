const mongoose = require("mongoose");

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
    type: Number,
  },
  region: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
