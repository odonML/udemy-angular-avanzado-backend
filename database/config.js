const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB_CNN;
const dbConection = async () => {
  try {
    mongoose.connect(
      DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("DB Online");
  } catch (err) {
    console.log(err);
  }
};

module.exports={
    dbConection
}
