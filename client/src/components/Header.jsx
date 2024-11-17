import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMyContext } from "../app/Context";
import toast from "react-hot-toast";
import api from "../api/api";

const Header = () => {
  const { setCurrentUser, role } = useMyContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");

      toast.success("Logout Successful");

      navigate("/signin");
      setCurrentUser(null);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 text-lg font-bold bg-primary text-white flex items-center justify-center rounded-full">
              HP
            </div>
            <span className="text-xl font-semibold tracking-wide">
              Health Portal
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 items-center">
            {role === "Doctor" && (
              <Link
                to="/doctor/profile"
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Profile
              </Link>
            )}

            {role === "Patient" && (
              <Link
                to="/patient/consultations"
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                My Consultations
              </Link>
            )}

            <button
              className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-center"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
