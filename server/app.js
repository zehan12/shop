const express = require("express");
const connectDatabase = require("./config/database");

connectDatabase();

const app = express();

module.exports = app;
