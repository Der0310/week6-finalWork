const multer = require("multer")
const path = require('path');

const upload = multer({
    dest: path.join(__dirname, '..', 'public', 'uploads'),// carpeta uploads va en gitignore para q no se suba
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        destination: path.join(__dirname, '..', 'public', 'uploads'),
    }),
})

module.exports = upload;