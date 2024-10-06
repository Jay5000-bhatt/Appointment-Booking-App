import express from "express";
import {
  TeacherDashboard,
  TeacherList,
  TeacherLogin,
  TeacherProfile,
  TeachersData,
  cancelAppointment,
  completeAppointment,
  fetchTeacherAppointments,
  updateTeacherProfile,
} from "../Controllers/TeacherController.js";
import upload from "../Middleware/Multer.js";
import { authTeacher } from "../Middleware/AuthTeacher.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/list", TeacherList);

TeacherRouter.get("/teacher-data/:TeacherId", TeachersData);

TeacherRouter.get("/appointments", authTeacher, fetchTeacherAppointments);

TeacherRouter.get("/teacher-dashboard", authTeacher, TeacherDashboard);

TeacherRouter.get("/profile", authTeacher, TeacherProfile);

TeacherRouter.post("/teacher-login", TeacherLogin);

TeacherRouter.post("/mark-appointment", authTeacher, completeAppointment);

TeacherRouter.post("/cancel-appointment", authTeacher, cancelAppointment);

TeacherRouter.post("/update-profile", upload.single("image"), authTeacher, updateTeacherProfile);

export default TeacherRouter;
