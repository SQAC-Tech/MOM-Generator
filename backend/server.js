// server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import "./Modules/db.js";
import cors from 'cors';
import bodyParser from 'body-parser';

import AuthRouter from './Routes/AuthRouter.js';
import DashboardRouter from './Routes/DashboardRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Match frontend Vite URL
  credentials: true
}));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/dashboard', DashboardRouter);

app.get('/', (req, res) => {
  res.send('Hello from MOM backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
