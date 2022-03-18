const express = require("express");
const controller = require("../controllers/notifications");
const router = express.Router();

router.post("/", controller.notifications);

module.exports = router;
