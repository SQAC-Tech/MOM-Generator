import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import "./Modules/db.js";
import cors from 'cors';
import bodyParser from 'body-parser';

import AuthRouter from './Routes/AuthRouter.js';
import DashboardRouter from './Routes/DashboardRouter.js';
import MOMRouter from './Routes/MOMRouter.js';
import PeopleRouter from './Routes/PeopleRouter.js';  // <-- NEW

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173","https://mom-generator-eight.vercel.app/"],
  credentials: true
}));


app.use('/auth', AuthRouter);
app.use('/dashboard', DashboardRouter);
app.use('/mom', MOMRouter);
app.use('/people', PeopleRouter);  // <-- NEW

app.get('/', (req, res) => {
  res.send('Hello from MOM backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Keep-alive for Render
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const SELF_URL = 'https://mom-generator.onrender.com/';

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    fetch(SELF_URL)
      .then(res => console.log(`[KEEP-ALIVE] Pinged ${SELF_URL} | Status: ${res.status}`))
      .catch(err => console.error(`[KEEP-ALIVE] Error pinging: ${err.message}`));
  }, 14 * 60 * 1000);
}
