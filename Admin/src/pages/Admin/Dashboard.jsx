import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

import { MdOutlineCancel } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, CancelAppointments, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalTeachers}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalAppointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalUsers}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashData?.todayAppointments &&
          dashData.todayAppointments.length > 0 ? (
            dashData.todayAppointments.map((data, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  src={data.TeachersData
                    ?.image || assets.doctor_icon}
                  alt={data.TeachersData
                    ?.name}
                  className="rounded-full w-10"
                />

                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {data.TeachersData
?.name}
                  </p>
                  <p className="text-gray-600">
                    {data.slotTime} on {slotDateFormat(data.slotDate)}
                  </p>
                </div>

                {data.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : data.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <MdOutlineCancel
                    onClick={() => CancelAppointments(data._id)}
                    size={26}
                    className="text-red-600 cursor-pointer ml-2"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 px-6 py-2 mt-5 mb-5">
              No appointments for today.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
