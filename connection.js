const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDb() {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));
}

module.exports = {
  connectMongoDb,
};
