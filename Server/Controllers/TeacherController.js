import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Appointment from "../Models/AppointmentModel.js";
import Teacher from "../Models/TeacherModel.js";
dotenv.config();

export const TeacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if both fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password Incorrect" });
    }

    // Check if password matches
    const isMatch = await bcryptjs.compare(password, teacher.password);
    if (isMatch) {
      // Generate token if password matches
      const Token = jwt.sign(
        { TeacherId: teacher._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.json({
        success: true,
        message: "Logged in successfully",
        Token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password Incorrect" });
    }
  } catch (error) {
    console.error("Error in login ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changeAvailability = async (req, res) => {
  try {
    const { TeacherId } = req.body;

    const TeacherData = await Teacher.findById(TeacherId);
    await Teacher.findByIdAndUpdate(TeacherId, {
      available: !TeacherData.available,
    });

    res.status(200).json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const TeacherList = async (req, res) => {
  try {
    const Teachers = await Teacher.find({}).select(["-email", "-password"]);
    res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      data: Teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const TeachersData = async (req, res) => {
  try {
    const { TeacherId } = req.params; // Use req.params to access the URL parameter
    const teacher = await Teacher.findById(TeacherId).select(["-email", "-password"]);

    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    res.status(200).json({
      success: true,
      message: "Teacher fetched successfully",
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const fetchTeacherAppointments = async (req, res) => {
  try {
    const { TeacherId } = req.body;
    const appointments = await Appointment.find({ TeacherId: TeacherId });
    res.json({
      success: true,
      message: "Teacher's Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in fetching Teacher's appointments ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { TeacherId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.TeacherId === TeacherId) {
      await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({
        success: true,
        message: "Appointment completed successfully",
        data: appointmentData,
      });
    }
  } catch (error) {
    console.error("Error in setting completed appointments ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { TeacherId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.TeacherId === TeacherId) {
      await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({
        success: true,
        message: "Appointment cancelled successfully",
        data: appointmentData,
      });
    }
  } catch (error) {
    console.error("Error in cancelling appointment ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const TeacherDashboard = async (req, res) => {
  try {
    const { TeacherId } = req.body;
    const appointments = await Appointment.find({ TeacherId: TeacherId });
    let earnings = 0;

    appointments.map((data) => {
      if (data.isCompleted || data.payment) {
        earnings += data.amount;
      }
    });

    let students = [];
    appointments.map((data) => {
      if (!students.includes(data.userId)) {
        students.push(data.userId);
      }
    });

    const dashData = {
      appointmentsCount: appointments.length,
      earnings: earnings,
      studentsCount: students.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      message: "Teacher's Dashboard data fetched successfully",
      data: dashData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const TeacherProfile = async (req, res) => {
  try {
    const { TeacherId } = req.body;
    const Teacherdata = await Teacher.findById(TeacherId).select("-password");

    if (!Teacherdata) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    res.status(200).json({
      success: true,
      message: "Teacher's Profile fetched successfully",
      data: Teacherdata,
    });
  } catch (error) {
    console.error("Error in fetching Teacher's profile ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTeacherProfile = async (req, res) => {
  try {
    const { TeacherId, fees, address, available } = req.body;
    const imageFile = req.file;

    if (!TeacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher ID is required" });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(TeacherId, {
      fees,
      address: JSON.parse(address),
      available,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await Teacher.findByIdAndUpdate(TeacherId, { image: imageUrl });
    }

    if (updatedTeacher) {
      res.status(200).json({
        success: true,
        message: "Teacher's Profile updated successfully",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }
  } catch (error) {
    console.error("Error in updating Teacher's profile ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
