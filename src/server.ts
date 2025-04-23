import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/databaseConfig';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
