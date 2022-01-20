const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = require("../config/keys");
const errorHandler = require("../utils/error-handler");

module.exports.signup = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      pwd: req.body.pwd,
    })
    newUser.save()
        .then(res.json(newUser))
        .catch(e => res.status(500).json({ message: e.message }))
  } catch (e) {
    errorHandler(res, e);
  }
};
