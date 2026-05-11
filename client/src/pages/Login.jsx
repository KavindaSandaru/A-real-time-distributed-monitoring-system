import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
         "user",
          res.data.name
      );

      localStorage.setItem(
  "email",
  res.data.email
);

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">

      <div className="bg-[#1E293B] p-10 rounded-3xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2">
          MonitorX
        </h1>

        <p className="text-slate-400 mb-8">
          Infrastructure Monitoring Platform
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 text-slate-300">
              Email
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

          <div>

            <label className="block mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-bold"
          >

            Login

          </button>

        </form>

      </div>
    </div>
  );
}