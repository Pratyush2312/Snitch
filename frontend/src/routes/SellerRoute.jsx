import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../context/MyStore";

function SellerRoute() {
  const token = localStorage.getItem("accessToken");
  const { user } = useContext(MyStore);

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "seller") return <Navigate to="/products" replace />;

  return <Outlet />;
}

export default SellerRoute;
