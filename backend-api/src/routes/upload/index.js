"use strict";

const express = require("express");
const router = express.Router();
const { authentication } = require("../../auth/authUtils");
const asyncErrorHandler = require("../../helpers/asyncErrorHandler");
const UploadController = require("../../controllers/upload.controller");

// router.use(authentication);

router.post("/product", asyncErrorHandler(UploadController.uploadImageFromUrl)); // may use productId here

module.exports = router;
