import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from '../middlewares/S3Middleware';
import { httpStatus } from '../types/httpStatus';

export async function uploadPicture(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "No file uploaded" });
      return;
    }
 
    res.status(httpStatus.SUCCESS).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occured while uploading your file: ", error });
  }
}

export async function getGallery(req: Request, res: Response) {
  try {
    const command = new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET! });
    const { Contents } = await s3.send(command);

    const files = Contents?.map(file => ({
        url: `https://${process.env.S3_BUCKET!}.s3.${process.env.S3_REGION!}.amazonaws.com/${file.Key}`,
        name: file.Key
    })) || [];

    res.status(httpStatus.SUCCESS).json({ message: "Images found: ", files })

  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occured while getting your images: ", error });
  }
}