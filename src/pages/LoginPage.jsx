import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "../index.css";
import { useLoginMutation } from "../redux/services/authApi";
import { setAuth } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const LoginPage = ({ setRegOrLog }) => {
  const [login, { data, isLoading, isError }] = useLoginMutation();
  const [logindata, setLogindata] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogindata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (logindata.username && logindata.password) {
      login(logindata);
    } else {
      alert("Username and password cannot be empty");
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.idofuser);
      localStorage.setItem("role", data.role);
      navigate("/");
      window.location.reload();
    }
  }, [data, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-300">
          Todo Application
        </h1>
      </motion.div>

      {/* Login Form */}
      <Paper
        className="p-6 w-full max-w-md shadow-xl bg-gradient-to-br from-gray-700 to-gray-900 rounded-md"
        elevation={6}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-slate-300">Login Here</h1>
          <p className="text-gray-400 text-sm">Access your tasks easily</p>
        </motion.div>

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-100 text-red-600 border border-red-400 rounded"
          >
            <ErrorPage />
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              name="username"
              value={logindata.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full p-3 text-sm sm:text-base border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={logindata.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-3 text-sm sm:text-base border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "blue",
                color: "#fff",
                padding: "12px 0",
                fontSize: "1rem",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400 text-sm sm:text-base">
            Don’t have an account?{" "}
            <span
              onClick={() => setRegOrLog((prev) => !prev)}
              className="text-blue-500 text-sm sm:text-base font-medium cursor-pointer"
            >
              Register here
            </span>
          </p>
        </motion.div>
      </Paper>
    </div>
  );
};

export default LoginPage;
