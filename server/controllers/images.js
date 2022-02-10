const Image = require('../models/Image');
const errorHandler = require("../utils/error-handler");

exports.getImage = async (req, res) => {
    try {
        const userImage = await Image.findOne({ userId: req.params.userId });
        if (userImage) {
            const imageUrl = userImage["imagePath"];
            res.status(200).json(imageUrl);
        } else {
            res.status(201).json("");
        }
    } catch (e) {
        errorHandler(res, e);
    }
};



exports.postImage = async (req, res) => {
    const { userId } = req.body;
    const userImage = await Image.findOne({ userId: userId });
    if (!userImage) {
        const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
        const image = new Image({
            userId,
            imagePath,
        });
        const createdImage = await image.save();
        res.status(201).json({
            image: {
                ...createdImage.toJSON(),
            },
        });
    } else {
        const imageUrl = userImage["imagePath"];
        res.status(202).json(imageUrl);
    }
};