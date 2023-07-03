const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("CONNECTED TO MONGODB..."));
};

module.exports = connectDB;
