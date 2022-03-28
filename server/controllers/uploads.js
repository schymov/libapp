const Upload = require("../models/Upload");
const errorHandler = require("../utils/error-handler");

exports.getUpload = async (req, res) => {
  // try {
  //     const uploadImage = await Upload.findOne({ userId: req.params.userId });
  //     if (userImage) {
  //         const imageUrl = userImage["imagePath"];
  //         res.status(200).json(imageUrl);
  //     } else {
  //         res.status(201).json("");
  //     }
  // } catch (e) {
  //     errorHandler(res, e);
  // }
};

exports.postUpload = async (req, res) => {
  const uploadPath = "http://localhost:3000/upload/" + req.file.filename; // Note: set path dynamically
  const upload = new Upload({ uploadPath });
  const createdUpload = await upload.save();
  res.status(201).json(createdUpload.toJSON());
};
