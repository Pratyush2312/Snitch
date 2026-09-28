import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../../../api/api";
import { MyStore } from "../../../context/MyStore";

const useAuthHook = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(MyStore);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "user" },
    mode: "onChange",
  });

  const handleRegister = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message || "Account created successfully");

      navigate("/login");
    } catch (error) {
      const response = error.response?.data;

      toast.error(
        response?.errors?.[0]?.msg ||
          response?.message ||
          "Registration failed",
      );
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      toast.success(res.data.message);
      setUser(res.data.data.user);
      navigate("/products");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("accessToken");

      setUser(null);

      navigate("/");
      toast.success("Logged out successfully");
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    handleRegister,
    handleLogin,
    logout,
  };
};

export default useAuthHook;
