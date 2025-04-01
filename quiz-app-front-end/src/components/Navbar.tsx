import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          QuizMaster
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="text-white text-lg font-medium hover:text-gray-200 transition"
          >
            Quiz
          </Link>
          <Link
            to="/profile"
            className="text-white text-lg font-medium hover:text-gray-200 transition"
          >
            Profile
          </Link>
          
          {/* Login or User Icon */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700">Logout</button>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg font-medium hover:text-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
