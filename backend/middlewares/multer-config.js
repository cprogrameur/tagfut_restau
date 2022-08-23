const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, files, callback) => {
    callback(null, 'images');
  },
  filename: (req, files, callback) => {
    const name = files.originalname.split(' ').join('_');
    const extension = MIME_TYPES[files.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});


module.exports = multer({storage: storage}).fields([{ name: 'couverture', maxCount: 1 }, { name: 'bloc1', maxCount: 1 }, { name: 'bloc2', maxCount: 1 }, { name: 'bloc3', maxCount: 1 }, { name: 'bloc4', maxCount: 1 }])