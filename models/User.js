const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg",
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exist"],
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    apiKey: {
      type: String,
      required: true,
    },
    chats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("users", userSchema);
