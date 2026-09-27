import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "../features/auth/ui/Login";
import Register from "../features/auth/ui/Register";
import Landing from "../shared/Landing";
import Products from "../features/products/ui/Products";
import ProductDetails from "../features/products/ui/ProductDetails";
import Cart from "../features/cart/ui/Cart";
import SellerDashboard from "../features/seller/ui/SellerDashboard";
import ProductForm from "../features/seller/ui/ProductForm";
import ProtectedRoute from "./ProtectedRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/products", element: <Products /> },
  { path: "/products/:id", element: <ProductDetails /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/cart", element: <Cart /> }],
  },
  {
    element: <SellerRoute />,
    children: [
      { path: "/seller", element: <SellerDashboard /> },
      { path: "/seller/products/new", element: <ProductForm /> },
      { path: "/seller/products/:id/edit", element: <ProductForm /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
