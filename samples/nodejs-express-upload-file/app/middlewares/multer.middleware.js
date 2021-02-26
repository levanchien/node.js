const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + '/../..' + '/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext.toLowerCase())) {
    return callback(null, true);
  }
  callback(new Error('Invalid File'), false);
}

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = upload;
