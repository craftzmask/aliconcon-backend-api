"use strict";

const UploadService = require("../services/upload.service");
const { OK } = require("../core/success.response");
const { BadRequestError } = require("../core/error.response");

const uploadImageFromUrl = async (_req, res) => {
  OK({
    message: "Upload image successfully",
    metadata: await UploadService.uploadImageFromUrl(),
  }).send(res);
};

const uploadImageFromLocal = async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("Missing File");
  }

  OK({
    message: "Upload local image successfully",
    metadata: await UploadService.uploadImageFromLocal({
      path: req.file.path,
    }),
  }).send(res);
};

const UploadController = { uploadImageFromUrl, uploadImageFromLocal };

module.exports = UploadController;
