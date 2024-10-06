import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [TeacherToken, setTeacherToken] = useState(localStorage.getItem("TeacherToken") ? localStorage.getItem("TeacherToken") : "");
  
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [TeacherProfile, setTeacherProfile] = useState(false);

  const getTeacherAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/teacher/appointments`,
        {
          headers: { TeacherToken: TeacherToken },
        }
      );
      if (data.success) {
        setAppointments(data.data.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const markCompleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/teacher/mark-appointment`,
        { appointmentId },
        {
          headers: { TeacherToken: TeacherToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getTeacherAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const CancelledAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/teacher/cancel-appointment`,
        { appointmentId },
        {
          headers: { TeacherToken: TeacherToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getTeacherAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/teacher/teacher-dashboard`,
        {
          headers: { TeacherToken: TeacherToken },
        }
      );
      if (data.success) {
        setDashData(data.data);
        console.log(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/teacher/profile`, {
        headers: { TeacherToken: TeacherToken },
      });
      if (data.success) {
        setTeacherProfile(data.data);
        console.log(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    TeacherToken,
    setTeacherToken,

    appointments,
    setAppointments,
    getTeacherAppointments,
    markCompleteAppointment,
    CancelledAppointment,

    dashData,
    setDashData,
    getDashData,

    TeacherProfile,
    setTeacherProfile,
    getProfileData,
  };

  return (
    <TeacherContext.Provider value={value}>
      {props.children}
    </TeacherContext.Provider>
  );
};

export default TeacherContextProvider;
