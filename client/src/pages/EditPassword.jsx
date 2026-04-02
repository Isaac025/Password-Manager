import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getPasswords, editPassword } from "../services/passwordService";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPasswords();

        const selected = data.find((item) => item._id === id);

        if (selected) {
          setPassword(selected);

          // pre-fill form
          setValue("site", selected.site);
          setValue("username", selected.username);
          setValue("password", selected.password);
        }
      } catch (err) {
        toast.error("Failed to fetch password");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-40">
        <CircleLoader />;
      </div>
    );
  }

  const handleEdit = async (formData) => {
    try {
      await editPassword(id, formData);

      toast.success("Password updated successfully!");
      navigate("/passwords");
    } catch (error) {
      toast.error("Failed to update password");
      console.error(error);
    }
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
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
