import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RealtedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0) {
      if (speciality) {
        const doctorsData = doctors.filter(
          (data) => data.speciality === speciality && data._id !== docId
        );
        setRelDocs(doctorsData);
        console.log("Related Doctors List:", doctorsData);
      } else {
        console.log("No speciality selected.");
      }
    } else {
      console.log("No doctors available.");
    }
  }, [doctors, speciality, docId]);
  

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((data, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${data._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50" src={data.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
              <p
                    className={`w-2 h-2 bg-green-500 rounded-full ${
                      data.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p
                    className={`${
                      data.available ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {data.available ? "Available" : " Not Available"}
                  </p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{data.name}</p>
              <p className="text-gray-600 text-sm">{data.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default RealtedDoctors;
