import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from '../middlewares/S3Middleware';
import { httpStatus } from '../types/httpStatus';
import imageModel from '../models/imageModel';

export async function getGallery(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const images = await imageModel.find({ user: userId }).sort({ createdAt: -1 });

    res.status(httpStatus.SUCCESS).json({ message: "Gallery fetched successfully: ", images: images.map(img => ({
      id: img.id,
      title: img.title,
      description: img.description,
      url: img.url,
      createdAt: img.createdAt,
    }))})
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while getting your images: ", error });
  }
}

export async function getImageById(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const imageId = req.params.id;
    
    const image = await imageModel.findOne({ _id: imageId, user: userId });

    if (!image) {
      res.status(httpStatus.NOT_FOUND).json({ message: "Image not found"});
      return;
    }

    res.status(httpStatus.SUCCESS).json({ message: "Image found", image });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while getting the image: ", error });
  }
}

export async function editImage(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const imageId = req.params.id;
    const { title, description } = req.body;

    const image = await imageModel.findOne({ _id: imageId, user: userId });

    if (!image) {
      res.status(httpStatus.NOT_FOUND).json({ message: "Image not found"});
      return;
    }

    if (title) {
      image.title = title;
    }
    if (description) {
      image.description = description;
    }

    await image.save();

    res.status(httpStatus.SUCCESS).json({ message: "Image updated successfully", image });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while editing the image: ", error });
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const imageId = req.params.id;

    const image = await imageModel.findOne({ _id: imageId, user: userId});

    if (!image) {
      res.status(httpStatus.NOT_FOUND).json({ message: "Image not found"});
      return;
    }

    const deleteParams = {
      Bucket: process.env.S3_BUCKET!,
      Key: image.key
    }

    await s3.send(new DeleteObjectCommand(deleteParams));

    await imageModel.deleteOne({ _id: imageId });

    res.status(httpStatus.SUCCESS).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while deleting the image: ", error });
  }
}