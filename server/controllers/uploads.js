const Upload = require("../models/Upload");
const errorHandler = require("../utils/error-handler");
const fs = require("fs");

exports.getUpload = async (req, res) => {
  try {
    const files = fs.readdirSync("upload");

    if (files.length) {
      res.status(200).json(files);
    } else {
      res.status(201).json("");
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.postUpload = async (req, res) => {
  const uploadPath = "http://localhost:3000/upload/" + req.file.filename;
  const upload = new Upload({ uploadPath });
  const createdUpload = await upload.save();
  res.status(201).json(createdUpload.toJSON());
};
