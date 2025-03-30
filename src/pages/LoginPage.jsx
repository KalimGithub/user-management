import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import UsersListPage from "./UsersListPage";

const baseUrl = import.meta.env.VITE_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });
      console.log(response);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        setEmail("");
        setPassword("");
        navigate("/users");
      }
    } catch (error) {
      setError("Invalid credentials");
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-1/3 mt-12 px-12 py-8 gap-6 w-[400px] mx-auto rounded-xl shadow-2xl">
      <h1 className="text-3xl font-semi-bold ">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full my-4">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 px-6 py-2 w-full rounded-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-600 px-6 py-2 w-full rounded-sm focus:outline-none"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="border border-gray-600 px-6 py-2 w-full mx-auto bg-blue-600 cursor-pointer hover:bg-blue-800 text-white rounded-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
