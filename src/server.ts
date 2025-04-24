import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/databaseConfig';
import indexRoutes from './routes/indexRoutes';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(indexRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
