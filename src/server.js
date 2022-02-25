if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");

const db = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const docs = require("../docs");
const PORT = process.env.PORT || 4000;

async function server() {
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(
        fileUpload({
            useTempFiles: true,
        })
    );
    app.use(errorHandler);

    // Routes
    await routes(app);

    // Docs
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
    app.get("/", (req, res) => {
        res.send("Hello");
    });

    // MongoDB connection
    db();

    // Application listening
    app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
}

server();
