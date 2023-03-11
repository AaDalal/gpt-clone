const { hashSync, compareSync } = require("bcrypt");
const Query = require("../models/Chat");
const User = require("../models/User");
const { generateApiKey } = require("generate-api-key");
const { v4: uuid } = require("uuid");

exports.login = async (req, res) => {
  try {
    const maybeUser = await User.findOne({ username: req.body.username });
    if (!maybeUser)
      return res
        .status(401)
        .send({ success: false, message: "User doesn't exist" });
    
    const passwordMatch = compareSync(req.body.password, maybeUser.password);
    if (!passwordMatch)
      return res
        .status(401)
        .send({ success: false, message: "Wrong password" });
    maybeUser.password = undefined;
    
    res.send(maybeUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const newQuery = new Query({ texts: [] });
    const { _id } = await newQuery.save();
    const newUser = new User({
      uid: uuid(),
      ...req.body,
      password: hashSync(req.body.password, 10),
      apiKey: generateApiKey({ method: "bytes" }),
      queries: _id,
    });
    const user = await newUser.save();

    user.password = undefined;
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
