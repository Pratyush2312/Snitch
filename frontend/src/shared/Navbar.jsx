import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import useAuthHook from "../features/auth/hooks/useAuthHook";
import { MyStore } from "../context/MyStore";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuthHook();
  const { user } = useContext(MyStore);
 

 

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4dfd8] bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-18 flex items-center justify-between gap-5">
        <Link to="/" className="text-2xl font-black tracking-tight">
          Snitch
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/products" className="hover:text-[#d96f2b]">Products</Link>
          {user?.role === "seller" && <Link to="/seller" className="hover:text-[#d96f2b]">Seller Dashboard</Link>}
          {user && <Link to="/cart" className="hover:text-[#d96f2b]">Cart</Link>}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-500">Hi, {user.name || "there"}</span>
              <button onClick={logout} className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-100">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm font-semibold hover:text-[#d96f2b]">Login</button>
              <button onClick={() => navigate("/register")} className="px-4 py-2 rounded-xl bg-[#171513] text-white text-sm font-semibold hover:bg-[#302c28]">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
