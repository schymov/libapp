const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = require("../config/keys");
const errorHandler = require("../utils/error-handler");

module.exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordResult = req.body.password === user.pwd;
      if (passwordResult) {
        const token = jwt.sign(
          // добавляем данные в объект, который ляжет в localStore
          {
            email: user.email,
            username: user.username,
          },
          // тип шифрования
          key.jwt,
          // срок жизни токена, ед.изм - секунды, срок - сутки
          { expiresIn: 86400 }
        );
        res.status(200).json({ token: `Bearer ${token}` });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
