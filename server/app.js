const express = require("express");
const connectDatabase = require("./config/database");

connectDatabase();

const app = express();

// Set Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product/",require("./routes/product.route"));

module.exports = app;
