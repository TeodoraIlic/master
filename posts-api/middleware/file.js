const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

//configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        //this path should be relative to the path 
        //where is  server.js file
        callback(error, "./images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const exit = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '-' + Date.now() + '.' + exit);
    }
})

module.exports = multer({storage: storage}).single("image") ;