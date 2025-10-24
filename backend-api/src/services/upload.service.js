"use strict";

const crypto = require("crypto");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  s3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("../config/s3.config");
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
  const imageName = randomName();

  // upload image
  await s3Client.send(
    new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: imageName,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
    })
  );

  // get signed url to access the uploaded image
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: imageName,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

const randomName = () => crypto.randomBytes(16).toString("hex");

const UploadService = {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadMultipleImagesFromLocal,
  uploadImageFromLocalS3,
};

module.exports = UploadService;
