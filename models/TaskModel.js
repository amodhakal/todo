import { model, Schema, Types } from "mongoose";

const TaskSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", TaskSchema);
