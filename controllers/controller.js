const { google } = require('googleapis');
const request = require('request');
const fs = require('fs');

const credentialsPath = 'google-credfile.json';

const auth = new google.auth.GoogleAuth({
  keyFile: credentialsPath,
  scopes: [
    'https://www.googleapis.com/myfile',
    'https://www.googleapis.com/otherfile',
  ],
});

const drive = google.drive({ version: 'v3', auth });

async function downloadVideo(req, res) {
  try {
    const videoId = req.params.videoId;

    const { data } = await drive.files.get({
      fileId: videoId,
      alt: 'media',
    }, {
      responseType: 'stream',
    });

    const writeStream = res.writeHead(200, {
      'Content-Type': data.headers['content-type'],
      'Content-Disposition': `attachment; filename="${data.headers['content-disposition'].split('filename=')[1]}"`,
    });

    data.data
      .on('end', () => {
        res.end();
      })
      .on('error', (error) => {
        console.error('Error downloading video:', error);
        res.status(500).send('Error downloading video');
      })
      .pipe(writeStream);

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send('Error downloading video');
  }
}

async function uploadVideo(req, res) {
  try {
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({ error: 'No video file provided' });
    }
    const fileMetadata = {
      name: videoFile.originalname,
      mimeType: videoFile.mimetype,
    };

    const parentFolderId = 'your-destination-folder-id';

    const media = {
      mimeType: videoFile.mimetype,
      body: videoFile.buffer, 
    };

    const uploadedFile = await drive.files.create({
      resource: {
        name: fileMetadata.name,
        parents: [parentFolderId],
      },
      media: media,
      fields: 'id',
    });

    
    res.status(200).json({ fileId: uploadedFile.data.id, message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Error uploading video' });
  }
}

async function checkDownloadProgress(req, res) {
  try {
    const videoId = req.params.videoId;


    const videoDownloadUrl = 'https://drive.google.com/jerry.mp4';

    const writeStream = fs.createWriteStream('downloaded-video.mp4');

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="downloaded-video.mp4"');

    const options = {
      url: videoDownloadUrl,
      headers: {
        'User-Agent': 'request',
      },
    };

    let bytesRead = 0;
    let totalBytes = 0;

    const downloadRequest = request(options);
    downloadRequest.on('data', (chunk) => {
      bytesRead += chunk.length;
      totalBytes += chunk.length;

      const progress = ((bytesRead / totalBytes) * 100).toFixed(2);

      res.write(`Progress: ${progress}%\n`);
    });

    downloadRequest.pipe(writeStream);

    downloadRequest.on('end', () => {
      res.end('Download completed');
    });

    downloadRequest.on('error', (error) => {
      console.error('Error downloading video:', error);
      res.status(500).send('Error downloading video');
    });

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send('Error downloading video');
  }
}


module.exports = {
  downloadVideo,
  uploadVideo,
  checkDownloadProgress,
};
