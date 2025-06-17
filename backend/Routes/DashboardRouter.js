import express from 'express';
import isAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  console.log(' Dashboard route reached');
  res.status(200).json({ message: 'Authenticated' });
});

export default router;
