// server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import "./Modules/db.js";
import cors from 'cors';
import bodyParser from 'body-parser';

import AuthRouter from './Routes/AuthRouter.js';
import DashboardRouter from './Routes/DashboardRouter.js';
import router from './Routes/MOMRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://mom-generator-eight.vercel.app', // Match frontend Vite URL
  credentials: true
}));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/dashboard', DashboardRouter);
app.use('/mom',router);

app.get('/', (req, res) => {
  res.send('Hello from MOM backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

import https from 'https';

// Replace with your actual Render deployment URL
const SELF_URL = 'mom-generator.onrender.com';

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    https.get(SELF_URL, (res) => {
      console.log(`[KEEP-ALIVE] Pinged ${SELF_URL} | Status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`[KEEP-ALIVE] Error pinging: ${err.message}`);
    });
  }, 14 * 60 * 1000); // every 14 minutes
}