require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL,
    password: process.env.DB_PASSWORD,
  },
};

module.exports = config;
