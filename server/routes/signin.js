const express = require("express");
const controller = require("../controllers/signin");
const router = express.Router();

router.get("/", controller.signin);

module.exports = router;
