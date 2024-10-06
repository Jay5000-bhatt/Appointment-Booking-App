import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import Appointment from "../Models/AppointmentModel.js";
import User from "../Models/User.js";
import Teacher from "../Models/TeacherModel.js";

dotenv.config();

export const addTeacher = async (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;
  const imageFile = req.file;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a Valid Email." });
    }

    const TeacherAlreadyExists = await Teacher.findOne({ email });
    console.log("TeacherAlreadyExists", TeacherAlreadyExists);

    if (TeacherAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const TeacherData = new Teacher({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
    });

    await TeacherData.save();

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      Data: {
        ...TeacherData._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const TeacherData = await Teacher.find({}).select("-password");
    res.json({
      success: true,
      message: "Teachers fetched successfully",
      data: TeacherData,
    });
  } catch (error) {
    console.error("Error in getting Teachers data", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.json({
        success: true,
        message: "Logged in successfully",
        Token: token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllTeachersAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments data", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const AppointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { TeacherId, slotDate, slotTime } = appointmentData;
    const TeacherData = await Teacher.findById(TeacherId);

    let slots_booked = TeacherData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await Teacher.findByIdAndUpdate(TeacherId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error in canceling appointment ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.find({});
    const totalTeachers = await Teacher.find({});
    const todayAppointments = await Appointment.find({});

    const DashData = {
      totalUsers: totalUsers.length,
      totalTeachers: totalTeachers.length,
      totalAppointments: todayAppointments.length,
      todayAppointments: todayAppointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: DashData,
    });
  } catch (error) {
    console.error("Error in getting dashboard data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
