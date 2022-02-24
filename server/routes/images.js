const express = require('express');
const controller = require('../controllers/images');
const storage = require('../helpers/storage');
const router = express.Router();

router.get('/:userId', controller.getImage);

router.post('/', storage, controller.postImage);

module.exports = router;