import express from "express";
import {
  AppointmentCancel,
  addTeacher,
  adminDashboard,
  adminLogin,
  getAllTeachers,
  getAllTeachersAppointments,
} from "../Controllers/AdminController.js";
import upload from "../Middleware/Multer.js";
import { authAdmin } from "../Middleware/AuthAdmin.js";
import { changeAvailability } from "../Controllers/TeacherController.js";

const AdminRouter = express.Router();

AdminRouter.get("/all-teachers", authAdmin, getAllTeachers);

AdminRouter.get("/appointments", authAdmin, getAllTeachersAppointments);

AdminRouter.get("/dashboard", authAdmin, adminDashboard);

AdminRouter.post("/add-teacher", authAdmin, upload.single("image"), addTeacher);

AdminRouter.post("/login-admin", adminLogin);

AdminRouter.post("/change-availability", authAdmin, changeAvailability);

AdminRouter.post("/cancel-appointments", authAdmin, AppointmentCancel);

export default AdminRouter;
