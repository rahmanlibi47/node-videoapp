const multer = require('multer');
const path = require('path');

const VideoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const VideoFileName = 'Video_' + uniqueSuffix + fileExtension;
    cb(null, VideoFileName);
  },
});

const uploadVideos = multer({ storage: VideoStorage });

module.exports = uploadVideos;
