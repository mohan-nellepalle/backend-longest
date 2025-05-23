import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser);
router.get("/getUsers", getUsers);

export default router;
