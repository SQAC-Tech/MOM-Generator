import express from "express";
import verifyToken from "../Middlewares/Auth.js";
import isAdmin from "../Middlewares/isAdmin.js";
import { getPeople, addPerson } from "../Controllers/PeopleController.js";

const router = express.Router();

// ✔ Anyone logged-in can fetch attendees
router.get("/", verifyToken, getPeople);

// ✔ Only admin can add attendees
router.post("/", verifyToken, isAdmin, addPerson);

export default router;
