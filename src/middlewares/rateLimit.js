const rateLimit = require("express-rate-limit");

exports.uploadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100, // Limit each IP to 100 requests per day
});

exports.downloadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
});
