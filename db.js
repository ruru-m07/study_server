const mongoose = require("mongoose");
// require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);


const connectToMongo = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
