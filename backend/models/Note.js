import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, default: "#fff8b3" },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.model("Note", noteSchema);
