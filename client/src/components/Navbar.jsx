import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const redirect = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    redirect("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className=" max-w-260 w-full mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => redirect("/")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          PassVault
        </h1>
        <div>
          {!user ? (
            <div className="space-x-4">
              <button
                onClick={() => redirect("/login")}
                className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800"
              >
                Login
              </button>
              <button
                onClick={() => redirect("/signup")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="font-[700] text-[16px] text-gray-900">
                {" "}
                Welcome <span className="text-purple-800">{user.fullName}</span>
              </p>
              <button
                className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
