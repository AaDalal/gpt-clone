const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        enum: ["user", "system", "assistant"],
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = new mongoose.model("chat", chatSchema);
