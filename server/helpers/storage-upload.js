const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .trim()
      .split(/[' '_-]+/)
      .join("-");
    cb(null, fileName);
  },
});

const storage = multer({ storage: diskStorage }).single("file");

module.exports = storage;
