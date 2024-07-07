import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
});

export default model('Blog', BlogSchema)
