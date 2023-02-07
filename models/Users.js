import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: { type: "string", required: true },
  code: { type: "string" },
  isActive: { type: "boolean" },
  reminders: { type: Array, default: [] },
});

export default mongoose.model("User", userSchema);
