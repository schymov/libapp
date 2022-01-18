const express = require("express");
const controller = require("../controllers/signup");
const router = express.Router();

router.post("/", controller.signup);

module.exports = router;
