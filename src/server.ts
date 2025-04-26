import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/databaseConfig';
import indexRoutes from './routes/indexRoutes';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(indexRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
