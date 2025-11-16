import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import notesRoutes from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/notes', notesRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Notes App API');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});