const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatroomSchema = new Schema({
  name: { type: String },
  users: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      user_id: { type: String },
    },
  ],
  massage: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      to_id: { type: String },
      massage: { type: String },
      image: { type: String },
    },
  ],
});

const Chatroom = mongoose.model("chatroom", ChatroomSchema);
Chatroom.createIndexes();

module.exports = Chatroom;
