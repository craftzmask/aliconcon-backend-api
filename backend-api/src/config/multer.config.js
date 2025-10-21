"use strict";

const multer = require("multer");

const uploadFromMemory = multer({
  storage: multer.memoryStorage(),
});

const uploadFromDisk = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "./src/uploads");
    },
    filename: function (_req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = {
  uploadFromMemory,
  uploadFromDisk,
};
