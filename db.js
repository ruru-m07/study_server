const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = "mongodb+srv://ruru:ruru@cluster0.we7aoj9.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
