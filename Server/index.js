import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import ConnectDB from "./Config/ConnectDB.js";
import connectCloudinary from "./Config/ConfigCloudinary.js";
import AdminRouter from "./Routes/AdminRoutes.js";
import TeacherRouter from "./Routes/TeacherRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

ConnectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use("/api/admin", AdminRouter);
app.use("/api/teacher", TeacherRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
