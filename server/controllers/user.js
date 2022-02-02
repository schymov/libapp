const User = require("../models/User");
const errorHandler = require("../utils/error-handler");

module.exports.getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findOne({ id: req.params.id });
    if (userInfo) {
      userInfo["pwd"] = "unknown";
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "User info not found" });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.updateFavorites = async (req, res) => {
  try {
    const userInfo = await User.findOne({ id: req.params.id });
    if (userInfo) {
      const userFavorites = userInfo.favorites;
      const bookId = req.body.bookId;
      const indexId = userFavorites.indexOf(bookId);
      if (indexId !== -1) {
        userFavorites.splice(indexId, 1);
      } else {
        userFavorites.push(bookId);
      }

      const updatedUser = await User.findOneAndUpdate(
        { id: req.params.id },
        { $set: { favorites: userFavorites } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User info not found" });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
