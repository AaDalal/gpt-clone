const Chat = require("../models/Chat");
const { completeViaChatGPT } = require("../chatGPT");
const { v4: uuid } = require("uuid");

exports.chat = async (req, res) => {
  try {
    const tempId = uuid();

    const { message } = req.body;
    await Chat.updateOne(
      { _id: req.chatId },
      { $push: { messages: message } }
    );

    const { data: { choices } } = await completeViaChatGPT({ messages: [message] });
    await Chat.updateOne(
      { _id: req.chatId },
      { $push: { messages: choices.at(0)?.message } }
    );
    
    res.send({
      message: choices[0]?.message,
      _id: choices[0] ? tempId : undefined,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.chatId });
    if (!chat) return res
      .status(400)
      .send({ success: false, message: "Chat doesn't exist" });
    res.send(chat);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
