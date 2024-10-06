import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { MdVerified, MdInfoOutline } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { TeacherId } = useParams();
  const navigate = useNavigate();
  const { currencySymbol, backendUrl, Token } = useContext(AppContext);
  const daysofWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [TeacherSlots, setTeacherSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [TeacherInfo, setTeacherInfo] = useState({});

  // Fetch teacher's data
  const getTeachersData = async () => {
    try {
      console.log("Fetching teacher data...");
      const { data } = await axios.get(
        backendUrl + `/api/teacher/teacher-data/${TeacherId}`
      );
      if (data.success) {
        setTeacherInfo(data.data);
        console.log("TeacherInfo:", data.data); // Log teacher data
      } else {
        toast.error("Failed to get teacher's data.");
      }
    } catch (error) {
      console.error("Error in getting teacher's data", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (Token) {
      getTeachersData();
    }
  }, [Token]);

  // Fetch available slots
  const getAvailableSlots = async () => {
    try {
      console.log("Fetching available slots...");
      setTeacherSlots([]);
      let today = new Date();

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0); // End time of slots

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1;
          let year = currentDate.getFullYear();

          const slotDate = `${day}_${month}_${year}`;
          const slotTime = formattedTime;

          const isSlotAvailable = TeacherInfo.slots_booked?.[
            slotDate
          ]?.includes(slotTime)
            ? false
            : true;

          if (isSlotAvailable) {
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        console.log(`Slots for day ${i + 1}:`, timeSlots); // Log time slots for each day
        setTeacherSlots((prev) => [...prev, timeSlots]);
      }
    } catch (error) {
      console.error("Error in fetching slots", error);
      toast.error("Failed to fetch slots. Please try again.");
    }
  };

  useEffect(() => {
    if (TeacherInfo) {
      getAvailableSlots();
    }
  }, [TeacherInfo]);

  useEffect(() => {
    if (TeacherSlots.length > 0) {
      console.log("Teacher Available Slots:", TeacherSlots); // Log available slots
    }
  }, [TeacherSlots]);

  const bookAppointment = async () => {
    if (!Token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }
    try {
      console.log("Booking appointment with slotIndex:", slotIndex); // Debug slot index
      const date = TeacherSlots[slotIndex]?.[0]?.datetime;

      if (!date) {
        toast.error("Please select a valid slot.");
        return;
      }

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      console.log("Selected slot date:", slotDate); // Debug slot date
      console.log("Selected slot time:", slotTime); // Debug slot time

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { TeacherId: TeacherId, slotDate, slotTime: slotTime },
        { headers: { Token } }
      );

      if (data.success) {
        toast.success(data.message);
        console.log("Appointment booked successfully:", data); // Success log
        getTeachersData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in booking appointment", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    TeacherInfo && (
      <div>
        {/* Teacher Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={TeacherInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 sm:mt-0 mt-0">
            {/* Teacher Info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {TeacherInfo.name}
              <MdVerified color="blue" size={26} />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {TeacherInfo.degree} - {TeacherInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {TeacherInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <MdInfoOutline size={18} />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {TeacherInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {TeacherInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {TeacherSlots.length > 0 &&
              TeacherSlots.map((data, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{data[0] && daysofWeek[data[0].datetime.getDay()]}</p>
                  <p>{data[0] && data[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {TeacherSlots[slotIndex]?.length > 0 &&
              TeacherSlots[slotIndex].map((data, index) => (
                <p
                  onClick={() => setSlotTime(data.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    data.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {data.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 my-6 rounded-full"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;
