const User = require("../models/User");

exports.checkKey = async (req, res, next) => {
  try {
    const user = await User.findOne({ apiKey: req.params.apiKey });
    if (!user) return res.status(401).send({ message: "Unauthorized" });
    req.chatId = user.chats;
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
