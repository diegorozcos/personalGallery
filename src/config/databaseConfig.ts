import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

const db_uri = process.env.MONGO_URI ?? '';

export async function connectDB() {
  try {
    await connect(db_uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB: ", error);
  }
}
