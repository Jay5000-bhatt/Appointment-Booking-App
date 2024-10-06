import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Teachers = () => {
  const { speciality } = useParams();
  const { Teachers } = useContext(AppContext); 

  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(Teachers.filter((data) => data.speciality === speciality));
    } else {
      setFilterDoc(Teachers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [Teachers, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the Teachers specialist.</p>
      <div className="flex flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => {
            setShowFilter((prev) => !prev);
          }}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 w-52 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => {
              speciality === "English"
                ? navigate("/Teachers")
                : navigate("/Teachers/English");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "English"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            English
          </p>
          <p
            onClick={() => {
              speciality === "Hindi"
                ? navigate("/Teachers")
                : navigate("/Teachers/Hindi");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Hindi" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Hindi
          </p>
          <p
            onClick={() => {
              speciality === "Maths"
                ? navigate("/Teachers")
                : navigate("/Teachers/Maths");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Maths" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Maths
          </p>
          <p
            onClick={() => {
              speciality === "Science"
                ? navigate("/Teachers")
                : navigate("/Teachers/Science");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Science" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Science
          </p>
          <p
            onClick={() => {
              speciality === "Social Science"
                ? navigate("/Teachers")
                : navigate("/Teachers/Social Science");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Social Science" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Social Science
          </p>
          <p
            onClick={() => {
              speciality === "Sanskrit"
                ? navigate("/Teachers")
                : navigate("/Teachers/Sanskrit");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Sanskrit"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Sanskrit
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${data._id}`);
              }}
              className="grid grid-rows-2 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <div className="h-full object-fill"><img className="justify-center items-center bg-blue-50" src={data.image} alt="" /></div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
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
      </div>
    </div>
  );
};

export default Teachers;
