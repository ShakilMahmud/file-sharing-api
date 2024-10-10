const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const { uploadLimiter, downloadLimiter } = require("./middlewares/rateLimit");
const fileRoutes = require("./api/routes/fileRoutes");

app.use(uploadLimiter);
app.use(downloadLimiter);

// Routes
app.use("/files", fileRoutes);
module.exports = app;
