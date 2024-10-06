import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../../context/TecherContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const TeacherDashboard = () => {
  const {
    TeacherToken,
    getDashData,
    dashData,
    markCompleteAppointment,
    CancelledAppointment,
  } = useContext(TeacherContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (TeacherToken) {
      getDashData();
    }
  }, [TeacherToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                <span className="text-green-400">₹ </span>
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointmentsCount}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.studentsCount}
              </p>
              <p className="text-gray-400">Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointment</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData?.latestAppointments &&
            dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    src={data.TeacherData?.image || assets.doctor_icon}
                    alt={data.TeacherData?.name}
                    className="rounded-full w-10"
                  />

                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {data.TeacherData?.name}
                    </p>
                    <p className="text-gray-600">
                      Booking on {slotDateFormat(data.slotDate)} at{" "}
                      {data.slotTime}
                    </p>
                  </div>

                  {data.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : data.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
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
              ))
            ) : (
              <p className="text-gray-500 px-6 py-2 mt-5 mb-5">
                No appointments for today.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TeacherDashboard;
