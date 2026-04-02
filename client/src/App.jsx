import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddPassword from "./pages/AddPassword";
import PasswordTable from "./pages/PasswordTable";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import EditPassword from "./pages/EditPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddPassword />
              </ProtectedRoute>
            }
          />
          <Route path="/passwords/:id" element={<EditPassword />} />
          <Route
            path="/passwords"
            element={
              <ProtectedRoute>
                <PasswordTable />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
