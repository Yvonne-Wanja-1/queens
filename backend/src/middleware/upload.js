const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

// Allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;

    const isValid =
        allowedTypes.test(file.mimetype) &&
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;