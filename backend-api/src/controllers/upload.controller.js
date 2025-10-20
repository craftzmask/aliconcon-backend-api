"use strict";

const UploadService = require("../services/upload.service");
const { OK } = require("../core/success.response");

const uploadImageFromUrl = async (req, res) => {
  OK({
    message: "Upload image successfully",
    metadata: await UploadService.uploadImageFromUrl(),
  }).send(res);
};

const UploadController = { uploadImageFromUrl };

module.exports = UploadController;
