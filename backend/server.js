import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "./Modules/db.js"
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js'
import DashboardRouter from './Routes/DashboardRouter.js'
const app = express();

const Port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/dashboard',DashboardRouter);

app.get('/', (req, res) => {
  res.send('Hello from root');
});

app.listen(Port, () => {
  console.log('Server running on http://localhost:3000');
});
