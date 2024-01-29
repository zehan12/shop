const mongoose = require("mongoose");
const config = require("../config/config");

const connectDatabase = async () => {
  const db = config.db.url.replace('<password>', config.db.password);
  const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
  };
  try {
    await mongoose.connect(db, options);
    console.log(`connected to database ✅`);
  } catch (e) {
    console.log(`Error connecting to mongoose due to ${e.message} ❌`);
  }
};

module.exports = connectDatabase;