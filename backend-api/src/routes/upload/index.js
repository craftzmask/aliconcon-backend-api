"use strict";

const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../../helpers/asyncErrorHandler");
const UploadController = require("../../controllers/upload.controller");
const { uploadFromDisk } = require("../../config/multer.config");

router.post("/product", asyncErrorHandler(UploadController.uploadImageFromUrl)); // may use productId here
router.post(
  "/product/thumb",
  uploadFromDisk.single("file"),
  asyncErrorHandler(UploadController.uploadImageFromLocal)
);

module.exports = router;
