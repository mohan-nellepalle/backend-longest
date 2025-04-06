import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkLogSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: Number,
      ref: "Task",
      required: [true, "Please provide a task ID"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    timeSpent: {
      type: Number,
      required: [true, "Please provide time spent"],
      min: [1, "Time spent must be at least 1 minute"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WorkLog = mongoose.model("WorkLog", WorkLogSchema);

export default WorkLog;
