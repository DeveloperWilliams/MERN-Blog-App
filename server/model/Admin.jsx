import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default model("AdminModel", AdminSchema);
