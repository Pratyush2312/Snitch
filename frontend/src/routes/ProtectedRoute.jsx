import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
