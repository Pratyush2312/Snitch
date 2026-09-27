import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const MyStore = createContext();

export const MyStoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getme = async () => {
        try {
            const res = await api.post("/auth/me");
            console.log(res.data.data.user);
            setUser(res.data.data.user);
        } catch (error) {
            console.log(error)
        }
        
      };
      getme();
  }, []);

  return (
    <MyStore.Provider value={{ user, setUser }}>{children}</MyStore.Provider>
  );
};
