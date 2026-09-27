import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../../../api/api";

const useAuthHook = () => {
  const navigate = useNavigate();

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
      console.log(data)
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
      navigate("/products");
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("accessToken");

      window.dispatchEvent(new Event("auth-change"));

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
