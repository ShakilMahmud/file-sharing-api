File Sharing API Service
A simple Node.js file-sharing API service for uploading, downloading, and deleting files. The project includes thorough API documentation and integration tests using Jest and Supertest.

Features
  ` File Upload: Upload files and receive public and private keys.
  ` File Download: Download files using the public key.
  ` File Deletion: Delete files using the private key.
Rate Limiting: Prevents excessive requests.

API Endpoints
1. POST /files
Uploads a file and returns public and private keys.

    Example Request:
    
    curl -X POST http://localhost:3000/files -F "file=@/path/to/file.txt"
    Example Response:
    json
    Copy code
    {
      "publicKey": "abc123",
      "privateKey": "xyz456"
    }
   
3. GET /files/pubickey
Downloads a file using the public key.

    Example Request:
    curl -O http://localhost:3000/files/abc123
    Example Response:
    File is downloaded as an attachment.

3. DELETE /files/privatekey
Deletes a file using the private key.

    Example Request:
    
    curl -X DELETE http://localhost:3000/files/xyz456
    Example Response:
    
    json
    Copy code
    {
      "message": "File deleted successfully"
    }

## Environment Variables
      Create a .env file in the root directory. Example:
      PORT=3000
      FOLDER=./files
      UPLOAD_LIMIT=100MB
      DOWNLOAD_LIMIT=500MB
      
## Installation
      git clone https://github.com/ShakilMahmud/file-sharing-api.git
      cd file-sharing-api
      npm install
      npm start
      The app will be available at http://localhost:3000.
      npm test
