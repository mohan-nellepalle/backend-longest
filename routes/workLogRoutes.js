import express from "express";
import {
  getWorkLogs,
  createWorkLog,
} from "../controllers/workLogController.js";
const router = express.Router();

router.get("/getAllWorkLogs", getWorkLogs);
router.post("/createWorkLog", createWorkLog);

export default router;
