import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  getPasswords,
  deletePassword as deletePasswordAPI,
} from "../services/passwordService";

const PasswordTable = () => {
  const [show, setShow] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleId, setVisibleId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const copyPassword = (pass) => {
    navigator.clipboard.writeText(pass);
    toast.success("Password copied!");
  };

  const redirect = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPasswords();
        setPasswords(data);
        // console.log(data);
      } catch (err) {
        toast.error("Failed to fetch passwords");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const confirmDelete = async () => {
    try {
      await deletePasswordAPI(selectedId);
      toast.success("Password deleted successfully!");

      setPasswords((prev) => prev.filter((item) => item._id !== selectedId));

      setShowModal(false);
      setSelectedId(null);
    } catch (error) {
      toast.error("Failed to delete password");
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

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
      {/* <div className="w-full overflow-x-auto p-4 md:p-8 bg-gray-100 min-h-screen">
        <table className="w-full max-w-[1040px]  border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left whitespace-nowrap">
                Website
              </th>
              <th className="border p-3 text-left whitespace-nowrap">
                Password
              </th>
              <th className="border p-3 text-left whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((item) => (
              <tr key={item._id}>
                <td className="border p-3 whitespace-nowrap">{item.site}</td>
                <td className="border p-3 whitespace-nowrap">
                  <input
                    type={visibleId === item._id ? "text" : "password"}
                    value={item.password}
                    readOnly
                    className="border rounded p-1 w-32 md:w-48"
                  />

                  <button
                    onClick={() =>
                      setVisibleId(visibleId === item._id ? null : item._id)
                    }
                  >
                    {" "}
                    {visibleId === item._id ? <IoMdEyeOff /> : <IoEye />}{" "}
                  </button>
                  <p>
                    {item.username
                      ? `${item.username} (username)`
                      : "No username"}
                  </p>
                </td>
                <td className="border p-3  whitespace-nowrap">
                  <button
                    onClick={() => copyPassword(item.password)}
                    className="mx-1 text-green-600 hover:underline"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => redirect(`/passwords/${item._id}`)}
                    className="mx-1 text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item._id);
                      setShowModal(true);
                    }}
                    className="mx-1 text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="w-full overflow-x-auto p-4 md:p-8 bg-gray-100 min-h-screen">
        {/* Desktop Table */}
        <table className="hidden md:table w-full max-w-[1040px] border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left whitespace-nowrap">
                Website
              </th>
              <th className="border p-3 text-left whitespace-nowrap">
                Password
              </th>
              <th className="border p-3 text-left whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((item) => (
              <tr key={item._id}>
                <td className="border p-3 whitespace-nowrap">{item.site}</td>
                <td className="border p-3 whitespace-nowrap">
                  <input
                    type={visibleId === item._id ? "text" : "password"}
                    value={item.password}
                    readOnly
                    className="border rounded p-1 w-32 md:w-48"
                  />
                  <button
                    onClick={() =>
                      setVisibleId(visibleId === item._id ? null : item._id)
                    }
                  >
                    {visibleId === item._id ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                  <p>
                    {item.username
                      ? `${item.username} (username)`
                      : "No username"}
                  </p>
                </td>
                <td className="border p-3 whitespace-nowrap">
                  <button
                    onClick={() => copyPassword(item.password)}
                    className="mx-1 text-green-600 hover:underline"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => redirect(`/passwords/${item._id}`)}
                    className="mx-1 text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item._id);
                      setShowModal(true);
                    }}
                    className="mx-1 text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {passwords.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded p-4 border space-y-2"
            >
              <div>
                <span className="font-semibold">Website: </span>
                {item.site}
              </div>
              <div>
                <span className="font-semibold">Password: </span>
                <input
                  type={visibleId === item._id ? "text" : "password"}
                  value={item.password}
                  readOnly
                  className="border rounded p-1 w-32"
                />
                <button
                  onClick={() =>
                    setVisibleId(visibleId === item._id ? null : item._id)
                  }
                  className="ml-2"
                >
                  {visibleId === item._id ? <IoMdEyeOff /> : <IoEye />}
                </button>
                <p>
                  {item.username
                    ? `${item.username} (username)`
                    : "No username"}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => copyPassword(item.password)}
                  className="text-green-600 hover:underline"
                >
                  Copy
                </button>
                <button
                  onClick={() => redirect(`/passwords/${item._id}`)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedId(item._id);
                    setShowModal(true);
                  }}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this password?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordTable;
