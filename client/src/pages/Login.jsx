import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = () => {};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-80 p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Email/Username"
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
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-3 text-blue-700">
          Dont have an account?{" "}
          <a href="/signup" className="underline text-red-600">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
