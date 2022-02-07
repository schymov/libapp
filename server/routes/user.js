const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/:id", controller.getUserInfo);
router.patch("/:id/favorites", controller.updateFavorites);
router.patch("/:id/info", controller.updateInfo);
router.patch("/:id/password", controller.updatePassword);


module.exports = router;
