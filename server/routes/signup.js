const express = require("express");
const controller = require("../controllers/signup");
const router = express.Router();

router.get("/", controller.signup);

module.exports = router;
