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
      file: req.file,
    }),
  }).send(res);
};

const uploadMultipleImagesFromLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("Missing Files");
  }

  OK({
    message: "Upload local images successfully",
    metadata: await UploadService.uploadMultipleImagesFromLocal({
      files: req.files,
    }),
  }).send(res);
};

const uploadImageFromLocalS3 = async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("Missing File");
  }

  OK({
    message: "Upload local image successfully",
    metadata: await UploadService.uploadImageFromLocalS3({
      file: req.file,
    }),
  }).send(res);
};

const UploadController = {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadMultipleImagesFromLocal,
  uploadImageFromLocalS3,
};

module.exports = UploadController;
