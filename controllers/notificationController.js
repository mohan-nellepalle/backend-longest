import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
};

export const createNotification = async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.status(201).json(notification);
};

// Remove the CommonJS export since we're using ES Module exports above
