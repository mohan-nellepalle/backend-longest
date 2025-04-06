import express from "express";
import { getTeams, createTeam } from "../controllers/teamController.js";
const router = express.Router();

router.route("/").get(getTeams).post(createTeam);

export default router;
