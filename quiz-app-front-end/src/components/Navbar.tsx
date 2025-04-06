import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold whitespace-nowrap">
          QuizMaster
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:flex-wrap md:gap-4 md:items-center md:justify-end md:w-auto`}
        >
          <Link
            to="/"
            className="block text-white text-base font-medium hover:text-gray-200 transition whitespace-nowrap md:inline"
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="block text-white text-base font-medium hover:text-gray-200 transition whitespace-nowrap md:inline"
          >
            Quiz
          </Link>
          <Link
            to="/profile"
            className="block text-white text-base font-medium hover:text-gray-200 transition whitespace-nowrap md:inline"
          >
            Profile
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center justify-center">
              <button
                onClick={handleLogout}
                className="block text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700 text-sm whitespace-nowrap md:inline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block text-white text-base font-medium hover:text-gray-200 transition whitespace-nowrap md:inline"
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