import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import User from "../Models/User.js";
import Appointment from "../Models/AppointmentModel.js";
import Teacher from "../Models/TeacherModel.js";

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a Valid Email." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const Token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      Token,
    });
  } catch (error) {
    console.error("Error in registration ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (isMatch) {
      const Token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      res
        .status(200)
        .json({ success: true, message: "Logged in successfully", Token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error in getting user data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { userId, name, phone, address, dob, gender } = req.body;
  const imageFile = req.file;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (!name || !phone || !address || !dob || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updating user data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const bookAppointment = async (req, res) => {
  const { userId, TeacherId, slotDate, slotTime } = req.body;
  try {
    if (!userId || !TeacherId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const TeachersData = await Teacher.findById(TeacherId).select("-password");
    if (!TeachersData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher is not available" });
    }

    let slots_booked = TeachersData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: "Slot is already booked" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");
    delete TeachersData.slots_booked;

    const appointmentData = {
      userId,
      TeacherId,
      userData,
      TeachersData,
      slotDate,
      slotTime,
      amount: TeachersData.fees,
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    await Teacher.findByIdAndUpdate(TeacherId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error in booking appointment ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = (await Appointment.find({ userId: userId })).reverse();

    if (!appointments) {
      return res
        .status(404)
        .json({ success: false, message: "No appointments found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Appointment data fetched successfully",
        data: appointments,
      });
    }
  } catch (error) {
    console.error("Error in fetching appointment data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to cancel this appointment",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    //releasing appointment
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
