import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const addSchema = yup
  .object({
    site: yup.string().required("Website is required"),
    name: yup.string().required("username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const AddPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  const handlePassword = () => {};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handlePassword)}
        className="w-96 p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add New Password</h2>
        <input
          type="text"
          placeholder="Website Name"
          className="w-full p-2 mb-3 border rounded"
          {...register("site")}
        />
        <p className="text-sm text-red-600">{errors.site?.message}</p>
        <input
          type="text"
          placeholder="username"
          className="w-full p-2 mb-3 border rounded"
          {...register("name")}
        />
        <p className="text-sm text-red-600">{errors.name?.message}</p>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          {...register("password")}
        />
        <p className="text-sm text-red-600">{errors.password?.message}</p>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded "
        >
          Add Password
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
