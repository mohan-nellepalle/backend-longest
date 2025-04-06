import WorkLog from "../models/WorkLog.js";
import mongoose from "mongoose";

const getWorkLogs = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filters from query params
    const { userId, taskId, projectId, startDate, endDate } = req.query;

    // Building query object
    let query = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query.userId = new mongoose.Types.ObjectId(userId);
    }
    if (taskId) {
      query.taskId = parseInt(taskId);
    }
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      query.projectId = new mongoose.Types.ObjectId(projectId);
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Get total count of records
    const totalRecords = await WorkLog.countDocuments(query);

    // Fetch filtered and paginated results
    const workLogs = await WorkLog.find(query)
      .populate({
        path: "userId",
        select: "name email role avatar settings",
      })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec(); // Ensuring execution of the query
    console.log("Fetched WorkLogs:", workLogs);
    res.json({
      success: true,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      data: workLogs,
    });
  } catch (error) {
    console.error("Error fetching work logs:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching work logs" });
  }
};

const createWorkLog = async (req, res) => {
  try {
    const { userId, taskId, description, timeSpent, date } = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }

    // Create worklog
    const workLog = new WorkLog({
      userId: new mongoose.Types.ObjectId(userId),
      taskId: parseInt(taskId),
      description,
      timeSpent,
      date: date || new Date(),
    });

    await workLog.save();

    // Populate user details
    await workLog.populate({
      path: "userId",
      select: "name email role avatar settings",
    });

    res.status(201).json({
      success: true,
      data: workLog,
    });
  } catch (error) {
    console.error("Error creating work log:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getWorkLogs, createWorkLog };
