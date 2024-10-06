import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { TeacherContext } from "../../context/TecherContext";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const TeachersAppointments = () => {
  const {
    TeacherToken,
    appointments,
    getTeacherAppointments,
    markCompleteAppointment,
    CancelledAppointment,
  } = useContext(TeacherContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const currency = "$";
  
  useEffect(() => {
    if (TeacherToken) {
      getTeacherAppointments();
    }
  }, [TeacherToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh]  overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Student</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((data, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={data.userData.image}
                alt=""
              />
              <p>{data.userData.name}</p>
            </div>

            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {data.payment ? "Online" : "Cash"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(data.userData.dob)}</p>

            <p>
              {slotDateFormat(data.slotDate)}, {data.slotTime}
            </p>

            <p>
              {currency}
              {data.amount}
            </p>

            {data.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : data.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <IoCheckmarkDoneCircleOutline
                  onClick={() => {
                    markCompleteAppointment(data._id);
                  }}
                  size={26}
                  className="text-green-600 cursor-pointer ml-2"
                />
                <MdOutlineCancel
                  onClick={() => {
                    CancelledAppointment(data._id);
                  }}
                  size={26}
                  className="text-red-600 cursor-pointer ml-2"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersAppointments;
