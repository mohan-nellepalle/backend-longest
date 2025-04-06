import mongoose from "mongoose";
const { Schema } = mongoose;

const ReportSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a report name"],
      trim: true,
      maxlength: [100, "Report name cannot be more than 100 characters"],
    },
    type: {
      type: String,
      enum: ["Project", "User", "Team", "Time"],
      required: [true, "Please provide a report type"],
    },
    filters: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
      teams: [
        {
          type: Schema.Types.ObjectId,
          ref: "Team",
        },
      ],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;
