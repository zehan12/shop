require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
};

module.exports = config;