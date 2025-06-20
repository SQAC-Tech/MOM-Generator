import express from 'express'
import MOM from '../Controllers/MOMController.js';
const router = express.Router();

router.post("/",MOM);


export default router;