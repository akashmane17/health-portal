import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connetDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorsRoutes.js";
import patientsRoutes from "./routes/patientsRoutes.js";

import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to DB
connetDB();

const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(deserializeUser);

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientsRoutes);

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "docs", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).send("File not found or error occurred");
    }
  });
});

app.get("/healthcheck", (req, res) => {
  res.send("Good!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
