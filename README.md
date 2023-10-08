# node-videoapp

# Video Handling with Node.js and Google Drive

# Requirements:
Node.js and npm installed on your system
Google Drive API credentials (JSON file)
express, googleapis, multer, and other dependencies

# Clone the repository or create a new Node.js project.
Install the project dependencies using the following command:
npm install

# Set up your Google Drive API credentials:

Create a Google Cloud project.
Enable the Google Drive API.
Create credentials for your project and download the JSON file.
Place the JSON credentials file in your project directory.
Configure the Google Drive API credentials path in app.js:

const credentialsPath = 'google-credfile.json';


# API Endpoints

# Download a Video:
/download/:videoId
Method: GET
Description: Downloads a video from Google Drive with the specified videoId. The progress of the download is displayed in the response.

# Upload a Video:
/upload
Method: POST
Description: Uploads a video file to Google Drive.

# Check Download Progress:
/status/:videoId
Method: GET
Description: Checks the download progress of the most recent download request. It provides a progress value as a percentage.


# Running the Application
Start the Node.js application with the following command:
node app.js
