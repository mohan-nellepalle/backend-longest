import express from "express";
import {
  getNotifications,
  createNotification,
} from "../controllers/notificationController.js";
const router = express.Router();

router.route("/").get(getNotifications).post(createNotification);

export default router;
