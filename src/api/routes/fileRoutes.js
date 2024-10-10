const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /files
router.post("/", upload.single("file"), fileController.uploadFile);

// GET /files/:publicKey
router.get("/:publicKey", fileController.downloadFile);

// DELETE /files/:privateKey
router.delete("/:privateKey", fileController.deleteFile);

module.exports = router;
