import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-hot-toast";

export const MyStore = createContext();

export const MyStoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(import.meta.env.VITE_API_URL)
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await api.post("/auth/me");
        setUser(res?.data.data.user);
      } catch (error) {
        toast.error(error.message)
      }
    };
    getMe();
  }, []);

  return (
    <MyStore.Provider value={{ user, setUser }}>{children}</MyStore.Provider>
  );
};
