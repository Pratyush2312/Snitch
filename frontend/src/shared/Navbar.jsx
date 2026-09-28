import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthHook from "../features/auth/hooks/useAuthHook";
import { MyStore } from "../context/MyStore";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuthHook();
  const { user } = useContext(MyStore);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4dfd8] bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-18 flex items-center justify-between gap-5">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-black tracking-tight">
          Snitch
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/products" className="hover:text-[#d96f2b]">
            Products
          </Link>

          {user?.role === "seller" && (
            <Link to="/seller" className="hover:text-[#d96f2b]">
              Seller Dashboard
            </Link>
          )}

          {user && (
            <Link to="/cart" className="hover:text-[#d96f2b]">
              Cart
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-500">
                Hi, {user.name || "there"}
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-semibold hover:text-[#d96f2b]">
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-xl bg-[#171513] text-white text-sm font-semibold hover:bg-[#302c28]">
                Register
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e4dfd8] bg-white">
          <nav className="px-6 py-5 flex flex-col gap-4">
            <Link
              to="/products"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#d96f2b]">
              Products
            </Link>

            {user?.role === "seller" && (
              <Link
                to="/seller"
                onClick={closeMenu}
                className="text-sm font-medium hover:text-[#d96f2b]">
                Seller Dashboard
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                onClick={closeMenu}
                className="text-sm font-medium hover:text-[#d96f2b]">
                Cart
              </Link>
            )}

            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-gray-500">
                    Hi, {user.name || "there"}
                  </span>

                  <button
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      closeMenu();
                      navigate("/login");
                    }}
                    className="w-full px-4 py-2 text-sm font-semibold hover:text-[#d96f2b]">
                    Login
                  </button>

                  <button
                    onClick={() => {
                      closeMenu();
                      navigate("/register");
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-[#171513] text-white text-sm font-semibold hover:bg-[#302c28]">
                    Register
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
