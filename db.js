const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/study_community";
const Chatroom = require("./models/Chatroom");

const connectToMongo = async () => {
  // var watchMongodb = function () {
  //   const chatroom = Chatroom
  //   console.log(chatroom)
  //   const changeStream = chatroom.watch();
  //   changeStream.on("change", (next) => {
  //     // process next document
  //   });
  // };
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
    // watchMongodb();
  });
};


module.exports = connectToMongo;
