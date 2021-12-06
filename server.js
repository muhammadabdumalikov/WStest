if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const db = require("./config/database");

const app = express();

// MongoDB connection
db();

// Application listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
