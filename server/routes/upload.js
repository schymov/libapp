const express = require("express");
const controller = require("../controllers/uploads");
const storage = require("../helpers/storage-upload");
const router = express.Router();

// router.get('/:userId', controller.getImage);
router.post("/", storage, controller.postUpload);

module.exports = router;
