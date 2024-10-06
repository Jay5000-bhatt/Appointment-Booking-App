import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid Email Address.",
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    fees: {
      type: Number,
      required: true,
      default: 0,
    },
    speciality: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: Object,
      required: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
