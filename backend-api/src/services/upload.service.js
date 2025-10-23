"use strict";

const cloudinary = require("../config/cloudinary.config");
const { s3Client, PutObjectCommand } = require("../config/s3.config");
const { AWS_BUCKET_NAME } = process.env;

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

const uploadImageFromLocal = async ({ file, folderName = "products/0000" }) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname,
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

const uploadMultipleImagesFromLocal = async ({
  files,
  folderName = "products/0000",
}) => {
  try {
    const uploaded = [];
    for (const file of files) {
      const result = await uploadImageFromLocal({ file, folderName });
      uploaded.push(result);
    }
    return uploaded;
  } catch (error) {
    console.error(error);
  }
};

const uploadImageFromLocalS3 = async ({ file }) => {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: "image/jpeg",
  };

  return await s3Client.send(new PutObjectCommand(uploadParams));
};

const UploadService = {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadMultipleImagesFromLocal,
  uploadImageFromLocalS3,
};

module.exports = UploadService;
