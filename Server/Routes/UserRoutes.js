import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getAppointment,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../Controllers/UserController.js";
import { authUser } from "../Middleware/AuthUser.js";
import upload from "../Middleware/Multer.js";

const UserRouter = express.Router();

UserRouter.get("/getUser", authUser, getUser);

UserRouter.get("/my-appointment", authUser, getAppointment);

UserRouter.post("/register", registerUser);

UserRouter.post("/login", loginUser);

UserRouter.post("/book-appointment", authUser, bookAppointment);

UserRouter.post("/cancel-appointment", authUser, cancelAppointment);

UserRouter.put("/update-profile", upload.single("image"), authUser, updateUser);


export default UserRouter;
