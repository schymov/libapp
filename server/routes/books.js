const express = require("express");
const controller = require("../controllers/books");
const router = express.Router();

router.get("/", controller.getAllBooks);

module.exports = router;
