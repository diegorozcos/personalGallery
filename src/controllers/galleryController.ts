import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from '../middlewares/S3Middleware';
import { httpStatus } from '../types/httpStatus';
import imageModel from '../models/imageModel';

export async function uploadPicture(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "No file uploaded" });
      return;
    }

    const { title, description } = req.body;

    const newImage = new imageModel({ title, description, key: (file as any).key, url: (file as any).location, user: (req as any).user.id })

    await newImage.save();
 
    res.status(httpStatus.SUCCESS).json({ message: "Image uploaded and saved: ", image: newImage });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occured while uploading your file: ", error });
  }
}

export async function getGallery(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const images = await imageModel.find({ user: userId }).sort({ createdAt: -1 });

    res.status(httpStatus.SUCCESS).json({ message: "Gallery fetched successfully: ", images: images.map(img => ({
        title: img.title,
        description: img.description,
        url: img.url,
        createdAt: img.createdAt,
      }))})
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occured while getting your images: ", error });
  }
}