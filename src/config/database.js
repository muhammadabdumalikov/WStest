const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // await mongoose.connection.dropDatabase();

        console.log("Mongoose connection");
    } catch (err) {
        console.error("Mongoose connection error: " + err.message);
    }
};

module.exports = db;
