import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isShelter = localStorage.getItem("role") === "shelter";
  const isUser = localStorage.getItem("role") === "adopter";
  const isFoster = localStorage.getItem("role") === "foster";

  const shelterId = localStorage.getItem("shelterId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("shelterId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fosterId");
    navigate("/");
  };

  return (
    <>

      <nav className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 shadow-lg py-4 px-8 fixed w-full z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
      
          <Link to="/" className="text-3xl font-bold text-white">
            🐾 PetAdopt
          </Link>

     
          <div className="flex items-center gap-6">
            

            {isShelter && (
              <>
              <Link
              to="/Home"
              className="text-lg font-medium text-white hover:text-gray-200 transition"
            >
              Home
            </Link>

                <Link
                  to={`/pet-request/${shelterId}`}
                  className="text-lg font-medium text-white hover:text-gray-200 transition"
                >
                  Requests
                </Link>
                <Link
                  to="/create"
                  className="text-lg font-medium text-white hover:text-gray-200 transition"
                >
                  Create Pet
                </Link>
                <Link
                  to="/shelter"
                  className="text-lg font-medium text-white hover:text-gray-200 transition"
                >
                  Shelter
                </Link>
                <Link to="/favorites" className="text-lg font-medium text-white hover:text-gray-200 transition">
              Favorites
            </Link>
              </>
            )}

            {isFoster && (
              <>
              <Link
              to="/Home"
              className="text-lg font-medium text-white hover:text-gray-200 transition"
            >
              Home
            </Link>
            <Link to="/favorites" className="text-lg font-medium text-white hover:text-gray-200 transition">
              Favorites
            </Link>
              
                <Link
                  to="/foster-details"
                  className="text-lg font-medium text-white hover:text-gray-200 transition"
                >
                  Profile
                </Link>
              </>
            )}

            {isUser && (
              <>
              <Link
              to="/Home"
              className="text-lg font-medium text-white hover:text-gray-200 transition"
            >
              Home
            </Link>
            <Link to="/favorites" className="text-lg font-medium text-white hover:text-gray-200 transition">
              Favorites
            </Link>
                <Link
                  to="/user-profile"
                  className="text-lg font-medium text-white hover:text-gray-200 transition"
                >
                  Profile
                </Link>
              </>
            )}

          
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-full shadow-md font-medium transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-full shadow-md font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full shadow-md font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

     
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
