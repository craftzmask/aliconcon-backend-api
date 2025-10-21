"use strict";

const cloudinary = require("../config/cloudinary.config");

const uploadImageFromUrl = async () => {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes", // name of image
        folder: "products/0000", // folder where contains the image
      }
    );

    return uploadResult;
  } catch (error) {
    console.error(error);
  }
};

const uploadImageFromLocal = async ({ path, folderName = "products/0000" }) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: "thumb",
      folder: folderName,
    });

    return {
      imageUrl: uploadResult.secure_url,
      shopId: "0000",
      thumbUrl: cloudinary.url(uploadResult.public_id, {
        height: 100,
        width: 100,
        format: "jpg",
      }),
    };
  } catch (error) {
    console.error(error);
  }
};

const UploadService = { uploadImageFromUrl, uploadImageFromLocal };

module.exports = UploadService;
