import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useEffect } from "react";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getPasswords } from "../services/passwordService";

const PasswordTable = () => {
  const [show, setShow] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleId, setVisibleId] = useState(null);

  const copyPassword = (pass) => {
    navigator.clipboard.writeText(pass);
    toast.success("Password copied!");
  };

  const redirect = useNavigate();

  const getPasswords = async () => {
    try {
      const res = await API.get("/passwords");
      setPasswords(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-40">
        <CircleLoader />;
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen ">
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
          {passwords.map((item) => (
            <tr key={item._id}>
              <td className="border p-3">{item.site}</td>
              <td className="border p-3">
                <input
                  type={visibleId === item._id ? "text" : "password"}
                  value={item.password}
                  readOnly
                  className="border rounded p-1"
                />

                <button
                  onClick={() =>
                    setVisibleId(visibleId === item._id ? null : item._id)
                  }
                >
                  {" "}
                  {visibleId === item._id ? <IoMdEyeOff /> : <IoEye />}{" "}
                </button>
                <p>{item.username} (username)</p>
              </td>
              <td className="border p-3 pl-0">
                <button
                  onClick={copyPassword(item.password)}
                  className="mx-1 text-green-600 hover:underline"
                >
                  Copy
                </button>
                <button
                  onClick={() => redirect("/passwords/item._id")}
                  className="mx-1 text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button className="mx-1 text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordTable;
