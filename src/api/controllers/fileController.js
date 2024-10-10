const FileService = require("../../services/fileService");

exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(404).json({ error: "File is missing!" });
  try {
    const { publicKey, privateKey } = await FileService.uploadFile(req.file);
    res.status(201).json({ publicKey, privateKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const filePath = await FileService.getFile(req.params.publicKey);
    res.download(filePath);
  } catch (error) {
    res.status(404).json({ error: "File not found" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    await FileService.deleteFile(req.params.privateKey);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "File not found" });
  }
};
