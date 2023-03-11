const Chat = require("../models/Chat");
const { createCompletionChatGTP } = require("../chatGTP");
const { v4: uuid } = require("uuid");

exports.chat = async (req, res) => {
  try {
    const tempId = uuid();

    const { message } = req.body;
    await Chat.updateOne(
      { _id: req.queryId },
      { $push: { messages: message } }
    );

    const { choices } = await createCompletionChatGTP({ message: req.body.message });
    await Chat.updateOne(
      { _id: req.queryId },
      { $push: { messages: choices[0]?.message } }
    );
    
    res.send({
      message: choices[0]?.message,
      _id: data.choices[0] ? tempId : undefined,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.queryId });
    if (!chat) return res
      .status(400)
      .send({ success: false, message: "Query doesn't exist" });
    res.send(query);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
