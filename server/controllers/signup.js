const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const key = require("../config/keys");
const errorHandler = require("../utils/error-handler");

module.exports.signup = async (req, res) => {
  try {
    //
  } catch (e) {
    errorHandler(res, e);
  }
};
