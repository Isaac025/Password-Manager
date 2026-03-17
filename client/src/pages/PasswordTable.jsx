import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PasswordTable = () => {
  const [show, setShow] = useState(false);
  const password = "mypassword";

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  const redirect = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">Saved Passwords</h2>
        <button
          onClick={() => redirect("/add")}
          className="bg-indigo-600 w-40 h-15 rounded-md text-white hover:bg-indigo-700"
        >
          Add New Password
        </button>
      </div>
      <table className="w-full max-w-[1040px] border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Website</th>
            <th className="border p-3">Password</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3">Gmail</td>
            <td className="border p-3">
              <input
                type={show ? "text" : "password"}
                value={password}
                readOnly
                className="border rounded p-1"
              />
              <button
                onClick={() => setShow(!show)}
                className="ml-2 text-blue-600 hover:underline"
              >
                {show ? <IoMdEyeOff title="hide" /> : <IoEye title="show" />}
              </button>
            </td>
            <td className="border p-3">
              <button
                onClick={copyPassword}
                className="mx-1 text-green-600 hover:underline"
              >
                Copy
              </button>
              <button
                onClick={() => redirect("/passwords/:id")}
                className="mx-1 text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button className="mx-1 text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PasswordTable;
