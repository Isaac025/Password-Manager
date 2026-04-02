import React from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { addPassword } from "../services/passwordService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const addSchema = yup
  .object({
    site: yup.string().required("Website is required"),
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const AddPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  const redirect = useNavigate();

  const handlePassword = async (form) => {
    setIsSubmitting(true);
    try {
      const { data } = await addPassword(form);
      toast.success("Password added successfully!");
      redirect("/passwords");
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Failed to add password");
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

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
          {...register("username")}
        />
        <p className="text-sm text-red-600">{errors.username?.message}</p>
        <div className="relative w-full mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            {...register("password")}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
          </span>
          <p className="text-sm text-red-600">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 bg-blue-500 text-white rounded "
        >
          {isSubmitting ? "Adding Password..." : "Add Password"}
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
