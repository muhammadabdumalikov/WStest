if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");

const db = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const docs = require("../docs");

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
app.use("/api", require("./routes"));

// Docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

// MongoDB connection
db();

// Application listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
