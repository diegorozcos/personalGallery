import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { httpStatus } from '../types/httpStatus';
import userModel from '../models/userModel';
const secret = process.env.JWT_SECRET!;

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "A required field was missing" });
      return;
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User created succesfully: ", newUser });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while creating the user: ", error });
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "A required field was missing" });
      return;
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, secret);

    res.status(httpStatus.SUCCESS).json({ message: "User logged in succesfully", token });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while logging in the user: ", error })
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const user = await userModel.findById(userId).select("name email role");

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(httpStatus.SUCCESS).json({ message: "User found: ", user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while getting the profile: ", error });
  }
}