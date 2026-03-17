import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const redirect = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Secure Your Passwords Effortlessly
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            PassVault keeps all your credentials safe, encrypted, and accessible
            anywhere. Say goodbye to forgotten passwords.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => redirect("/signup")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Get Started
            </button>
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500">
        © {new Date().getFullYear()} PassVault. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
