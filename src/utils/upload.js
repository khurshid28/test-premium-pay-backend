const path = require("path");
const multer = require("multer");
const { BadRequestError } = require("../utils/errors.js");

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new BadRequestError(400, "Only image files are allowed!"), false);
	}
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// Create Multer object
const upload = multer({ storage: storage, fileFilter });

module.exports = upload;
