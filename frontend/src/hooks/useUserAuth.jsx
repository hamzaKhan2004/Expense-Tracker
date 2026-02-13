/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPaths";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const isFetched = useRef(false);

  useEffect(() => {
    if (user || isFetched.current) return;

    isFetched.current = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);
        if (response?.data) {
          updateUser(response.data);
        }
      } catch (error) {
        clearUser();
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [user, updateUser, clearUser, navigate]);
};

export default useUserAuth;
