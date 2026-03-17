import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const editSchema = yup
  .object({
    site: yup.string().required("Website is required"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const EditPassword = () => {
  // const { id } = useParams(); // get password ID from route
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  // Fetch existing password entry
  // useEffect(() => {
  //   const fetchPassword = async () => {
  //     try {
  //       const res = await axios.get(`/api/passwords/${id}`);
  //       const { site, username, password } = res.data;
  //       setValue("site", site);
  //       setValue("username", username);
  //       setValue("password", password);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchPassword();
  // }, [id, setValue]);

  const handleEdit = async (data) => {
    // try {
    //   await axios.put(`/api/passwords/${id}`, data);
    //   navigate("/table"); // redirect after success
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleEdit)}
        className="w-96 p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Edit Password</h2>
        <input
          type="text"
          placeholder="Website Name"
          className="w-full p-2 mb-3 border rounded"
          {...register("site")}
        />
        <p className="text-sm text-red-600">{errors.site?.message}</p>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          {...register("username")}
        />
        <p className="text-sm text-red-600">{errors.username?.message}</p>

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          {...register("password")}
        />
        <p className="text-sm text-red-600">{errors.password?.message}</p>

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
