const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const uploadVideos = require('../middleware/uploadFiles.js');


router.get('/download/:videoId', controller.downloadVideo);

router.post('/upload', uploadVideos.single('video'), controller.uploadVideo);

router.get('/status/:videoId', controller.checkDownloadProgress);

module.exports = router;
