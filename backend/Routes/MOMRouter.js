import express from 'express'
import {MOM} from '../Controllers/MOMController.js';
const router = express.Router();
import MOMModel from "../Modules/momSchema.js";


router.post("/",MOM);
router.get("/", async (req, res) => {
  try {
    const momData = await MOMModel.find().sort({ date: -1 }); // sorted by newest
    res.status(200).json(momData);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch MOM data",
      error: err.message,
    });
  }
});


export default router;