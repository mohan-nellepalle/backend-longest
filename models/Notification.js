import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
    type: {
      type: String,
      required: [true, "Please provide a notification type"],
    },
    message: {
      type: String,
      required: [true, "Please provide a notification message"],
      maxlength: [200, "Message cannot be more than 200 characters"],
    },
    relatedTo: {
      type: {
        type: String,
        enum: ["Project", "Task", "Team", "WorkLog"],
        required: [true, "Please provide a related type"],
      },
      id: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide a related ID"],
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
