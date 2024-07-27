import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Initializing Dotenv
dotenv.config();

// Declaring the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 


//ROUTES 
//import  
import authRoute from "./routes/auth.js"
import blogRoute from "./routes/data.js"


//using routes
app.use('/auth', authRoute)
app.use('/blog', blogRoute)

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });

// Listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
