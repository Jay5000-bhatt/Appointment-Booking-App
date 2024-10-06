import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { MdOutlineCancel } from "react-icons/md";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointment,
    CancelAppointments,
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const currency = "₹";

  useEffect(() => {
    if (aToken) {
      getAllAppointment();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh]  overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Student</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Teacher</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((data, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={data.userData.image}
                alt=""
              />
              <p>{data.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(data.userData.dob)}</p>

            <p>
              {slotDateFormat(data.slotDate)}, {data.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={data.TeachersData.image}
                alt=""
              />
              <p>{data.TeachersData.name}</p>
            </div>

            <p>
              {currency}
              {data.amount}
            </p>

            {data.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : data.isCompleted ? <p className="text-green-400 text-xs font-medium">Completed</p> : (
              <MdOutlineCancel
                onClick={() => CancelAppointments(data._id)}
                size={26}
                className="text-red-600 cursor-pointer ml-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
