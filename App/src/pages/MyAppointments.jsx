import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { Token, backendUrl, getTeachersData } = useContext(AppContext);
  const [Appointments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/user/my-appointment`,
        { headers: { token: Token } }
      );
      if (data.success) {
        setAppointments(data.data);
        console.log(data.data);
      } else {
        toast.error("Failed to get appointment data.");
      }
    } catch (error) {
      console.error("Error in getting appointment data", error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/user/cancel-appointment`,
        { appointmentId: id },
        { headers: { token: Token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getTeachersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in canceling appointment", error);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  useEffect(() => {
    if (Token) {
      getUserAppointments();
    }
  }, [Token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {Appointments.map((data, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={data.TeachersData.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {data.TeachersData.name}
              </p>
              <p>{data.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address</p>
              <p className="text-xs">{data.TeachersData.address.line1}</p>
              <p className="text-xs">{data.TeachersData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(data.slotDate)} | {data.slotTime}
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!data.cancelled && !data.isCompleted && !data.payment && (
                <button className="text-sm text-center sm:min-w-48 py-2 border rounded bg-emerald-500 text-white transition-all duration-300">
                  Pay Via Cash For Now
                </button>
              )}

              {!data.cancelled && !data.isCompleted && !data.payment && (
                <button
                  onClick={() => {
                    cancelAppointment(data._id);
                  }}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}

              {data.cancelled && !data.payment && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}
              {!data.cancelled && data.payment && !data.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-yellow-500 rounded text-yellow-500">
                  Paid
                </button>
              )}
              {data.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
