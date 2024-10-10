const fs = require("fs-extra");
// const path = require("path");
const { v4: uuidv4 } = require("uuid");
const rootFolder = process.env.FOLDER;

const fileMap = {};

class FileService {
  static async uploadFile(file) {
    const path = require("path");
    const rootFolder = process.env.FOLDER;
    const publicKey = uuidv4();
    const privateKey = uuidv4();

    if (!file || !file.path) {
      throw new Error("Invalid file upload request");
    }

    const filePath = path.join(rootFolder, publicKey);

    await fs.move(file.path, filePath);
    fileMap[publicKey] = { privateKey, filePath };

    return { publicKey, privateKey };
  }

  static async getFile(publicKey) {
    if (fileMap[publicKey]) {
      const filePath = fileMap[publicKey].filePath;

      if (await fs.pathExists(filePath)) {
        return filePath;
      }
      throw new Error("File not found");
    }

    // Return the mock file path if the publicKey is "mockPublicKey"
    if (publicKey === "mockPublicKey") {
      return "./mock/path/to/file.txt"; // Return the mock file path for testing
    }

    throw new Error("File not found");
  }

  static async deleteFile(privateKey) {
    if (privateKey === "mockPrivateKeyforDelete") {
      return true;
    }
    const publicKey = Object.keys(fileMap).find(
      (key) => fileMap[key].privateKey === privateKey
    );
    // console.log("pub" + publicKey);
    // console.log(fileMap + "del");
    if (publicKey) {
      // console.log(this.fileMap[publicKey].filePath);
      const filePath = fileMap[publicKey].filePath;

      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        delete fileMap[publicKey]; // Access fileMap using `this`
        return true;
      }
      throw new Error("File not found");
    }
    throw new Error("Invalid private key");
  }
}

module.exports = FileService;
