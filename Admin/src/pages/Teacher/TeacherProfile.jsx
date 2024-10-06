import React, { useContext, useState, useEffect } from "react";
import { TeacherContext } from "../../context/TecherContext";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

const TeacherProfile = () => {
  const {
    backendUrl,
    TeacherToken,
    getProfileData,
    TeacherProfile,
    setTeacherProfile,
  } = useContext(TeacherContext);
  const currency = "₹";

  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("available", TeacherProfile.available);
      formData.append("fees", TeacherProfile.fees);
      formData.append("address", JSON.stringify(TeacherProfile.address));
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + `/api/teacher/update-profile`,
        formData,
        { headers: { TeacherToken: TeacherToken } }
      );
      if (data.success) {
        setEditMode(false);
        await getProfileData();
        setImage(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (TeacherToken) {
      getProfileData();
    }
  }, [TeacherToken]);

  return (
    TeacherProfile && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          {editMode ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={
                    image ? URL.createObjectURL(image) : TeacherProfile.image
                  }
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? " " : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 rounded-2xl"
              src={TeacherProfile.image}
              alt=""
            />
          )}

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {TeacherProfile.name}
            </p>

            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {TeacherProfile.degree} - {TeacherProfile.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {TeacherProfile.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:{" "}
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {TeacherProfile.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currency}&nbsp;
                {editMode ? (
                  <input
                    className="bg-gray-300 rounded-md  px-6"
                    type="number"
                    onChange={(e) => {
                      setTeacherProfile((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }));
                    }}
                    value={TeacherProfile.fees}
                  />
                ) : (
                  TeacherProfile.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address: </p>
              <p className="text-sm">
                {editMode ? (
                  <input
                    type="text"
                    className="bg-gray-300 rounded-md px-6 py-2"
                    onChange={(e) => {
                      setTeacherProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }));
                    }}
                    value={TeacherProfile.address.line1}
                  />
                ) : (
                  TeacherProfile.address.line1
                )}
                <br />
                {editMode ? (
                  <input
                    type="text"
                    className="bg-gray-300 rounded-md mt-2 px-6 py-2"
                    onChange={(e) => {
                      setTeacherProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }));
                    }}
                    value={TeacherProfile.address.line2}
                  />
                ) : (
                  TeacherProfile.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  editMode &&
                  setTeacherProfile((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                value={TeacherProfile.fees}
                checked={TeacherProfile.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {editMode ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditMode(true);
                }}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TeacherProfile;
