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
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  // generate random password function
  const generatePassword = ({
    length = 12,
    useUpper = true,
    useNumbers = true,
    useSymbols = true,
  }) => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+";

    let chars = lower;
    if (useUpper) chars += upper;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
  };

  // password strength function
  const getPasswordStrength = (password) => {
    let score = 0;

    if (!password) return { label: "", color: "" };

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500" };
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const passwordValue = watch("password");
  const strength = getPasswordStrength(passwordValue);

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
        {passwordValue && (
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className={`h-2 rounded ${strength.color}`}
                style={{
                  width:
                    strength.label === "Weak"
                      ? "33%"
                      : strength.label === "Medium"
                        ? "66%"
                        : "100%",
                }}
              />
            </div>
            <p className="text-sm mt-1 font-semibold">{strength.label}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 bg-blue-500 text-white rounded "
        >
          {isSubmitting ? "Adding Password..." : "Add Password"}
        </button>

        <button
          type="button"
          className="mt-3 border border-gray-200 bg-blue-100 p-3 rounded-lg font-[800]"
          onClick={() => {
            const newPassword = generatePassword({
              length,
              useUpper,
              useNumbers,
              useSymbols,
            });

            setValue("password", newPassword, {
              shouldValidate: true,
              shouldDirty: true,
            }); // updates the input
          }}
        >
          Generate Password
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
