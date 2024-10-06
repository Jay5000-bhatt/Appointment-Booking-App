import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";

  const [Teachers, setTeachers] = useState([]);
  const [userData, setUserData] = useState(false);
  const [Token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const getTeachersData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/teacher/list`,{}
      );
      if (data.success) {
        setTeachers(data.data);
      } else {
        toast.error("Failed to get teachers data.");
      }
    } catch (error) {
      console.error("Error in getting teachers data", error);
      toast.error(error.message);
    }
  };

  const userProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/user/getUser`, {
        headers: { token: Token },
      });
      if (data.success) {
        setUserData(data.data);
      } else {
        toast.error("Failed to get user profile data.");
      }
    } catch (error) {
      console.error("Error in getting user profile data", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTeachersData();
  }, []);

  useEffect(() => {
    if (Token) {
      userProfileData();
    } else {
      setUserData(false);
    }
  }, [Token]);

  const value = {
    backendUrl,
    currencySymbol,

    Token,
    setToken,

    Teachers,
    setTeachers,
    getTeachersData,

    userData,
    setUserData,
    userProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
