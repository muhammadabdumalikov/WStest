const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connection.");
  } catch (err) {
    console.error("Mongoose connection error: " + err.message);
  }
};

module.exports = connect;
