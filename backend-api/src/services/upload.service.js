"use strict";

const cloudinary = require("../config/cloudinary.config");

const uploadImageFromUrl = async () => {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes", // name of image
        folder: "products/shopId", // folder where contains the image
      }
    );

    return uploadResult;
  } catch (error) {
    console.error(error);
  }
};

const UploadService = { uploadImageFromUrl };

module.exports = UploadService;
