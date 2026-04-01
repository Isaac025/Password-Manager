import React from "react";
import { useState } from "react";
import { registerUser } from "../services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const registerSchema = yup
  .object({
    fullName: yup.string().required("full name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (form) => {
    setIsSubmitting(true);
    try {
      const { data } = await registerUser(form);
      localStorage.setItem("token", data.token);
      toast.success("Signup successful!");
      redirect("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-80 p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          {...register("fullName")}
        />
        <p className="text-sm text-red-600">{errors.fullName?.message}</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          {...register("email")}
        />
        <p className="text-sm text-red-600">{errors.email?.message}</p>

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
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {isSubmitting ? "Registering" : "Sign Up"}
        </button>
        <p className="mt-3 text-blue-700">
          Already have an account?{" "}
          <a href="/login" className="underline text-red-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
