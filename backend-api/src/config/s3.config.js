"use strict";

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { AWS_BUCKET_REGION, AWS_BUCKET_ACCESS_KEY, AWS_BUCKET_SECRET_KEY } =
  process.env;

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: AWS_BUCKET_SECRET_KEY,
  },
});

module.exports = {
  s3Client,
  PutObjectCommand,
  GetObjectCommand,
};
