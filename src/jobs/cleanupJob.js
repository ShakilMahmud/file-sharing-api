const cron = require("node-cron");
const fs = require("fs-extra");
const path = require("path");
const rootFolder = process.env.FOLDER;

const cleanupJob = () => {
  cron.schedule("0 0 * * *", async () => {
    const files = await fs.readdir(rootFolder);
    const now = Date.now();

    files.forEach(async (file) => {
      const filePath = path.join(rootFolder, file);
      const stats = await fs.stat(filePath);
      const lastAccessTime = new Date(stats.atime).getTime();

      if (now - lastAccessTime > 7 * 24 * 60 * 60 * 1000) {
        await fs.remove(filePath);
      }
    });
  });
};

module.exports = cleanupJob;
