import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const TeacherList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Teachers</h1>

      <div className="w-full grid grid-flow-col gap-4 pt-5 gap-y-6">
        {doctors.length > 0 ? (
          doctors.map((data, index) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer  grid"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 object-cover"
                src={data.image}
                alt={data.name}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {data.name}
                </p>
                <p className="text-zinc-600 text-sm">{data.speciality} Teacher</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    onChange={() => {
                      changeAvailability(data._id);
                    }}
                    type="checkbox"
                    checked={data.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherList;
