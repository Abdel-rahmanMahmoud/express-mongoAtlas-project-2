import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { httpStatusText } from "./utils/httpStatusText.js";
import studentRouters from './routes/studentsRoutes.js';
import usersRouters from "./routes/usersRoutes.js";
dotenv.config();
import crypto from "crypto";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

console.log("crypto",crypto.randomBytes(32).toString("hex"));

const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use("/api/students", studentRouters);
app.use("/api/users", usersRouters);

// handle not found routes
app.all(/.*/, (req, res, next) => {
    return res.status(404).json({ 
        status: httpStatusText.Error, 
        message: 'this resource is not available'
    });
});

// handle server error
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusText: err.httpStatusText || httpStatusText.Error,
    message: err.message || "Internal Server Error",
    code: err.code || 500,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
  console.log(`Server running on port ${PORT}`);
});
