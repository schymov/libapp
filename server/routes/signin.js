const express = require("express");
const controller = require("../controllers/signin");
const router = express.Router();

router.post("/", controller.signin);

module.exports = router;
