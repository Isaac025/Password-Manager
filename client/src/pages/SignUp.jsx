import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = () => {};

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

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          {...register("password")}
        />
        <p className="text-sm text-red-600">{errors.password?.message}</p>

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sign Up
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
