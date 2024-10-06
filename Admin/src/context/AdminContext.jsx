import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-teachers`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        console.log(data.data);
        setDoctors(data.data);
      } else {
        toast.error("Failed to fetch doctors.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/admin/change-availability`,
        { docId },
        { headers: { aToken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error("Failed to change availability.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        setAppointments(data.data);
        console.log(data.data);
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
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        console.log(data.data);
        setDashData(data.data);
      } else {
        toast.error("Failed to fetch dashboard data.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const CancelAppointments = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/admin/cancel-appointments`,
        { appointmentId: id },
        { headers: { aToken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDashData();
      } else {
        toast.error("Failed to cancel appointments.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointment,
    CancelAppointments,
    dashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
