import mongoose from "mongoose";
const { Schema } = mongoose;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a team name"],
      trim: true,
      maxlength: [50, "Team name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a team leader"],
    }
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", TeamSchema);

export default Team;
