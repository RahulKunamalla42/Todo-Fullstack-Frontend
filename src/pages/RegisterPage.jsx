import React, { useState } from "react";
import { Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "../index.css";
import { useRegisterMutation } from "../redux/services/authApi";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setRegOrLog }) => {
  const navigate = useNavigate();
  const [register, { data, isSuccess }] = useRegisterMutation();
  const [regData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regData.username && regData.password && regData.email) {
      register(regData);
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-300">
          Todo Application
        </h1>
      </motion.div>

      {/* Registration Form */}
      <Paper
        className="p-6 w-full max-w-lg shadow-xl bg-slate-300 bg-gradient-to-br from-gray-700 to-gray-900"
        elevation={6}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-gray-800">
            Register Here
          </h1>
          <p className="text-gray-400">Manage your tasks effortlessly</p>
        </motion.div>

        {/* Form Inputs */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
          onSubmit={handleRegister}
        >
          <div className="inputs space-y-3">
            <input
              type="text"
              name="username"
              value={regData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={regData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={regData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "blue",
                color: "#fff",
                padding: "12px 0",
              }}
            >
              Register
            </Button>
          </motion.div>
        </motion.form>

        {/* Redirect to Login */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setRegOrLog((prev) => !prev)}
              className="text-blue-500 text-lg font-semibold cursor-pointer"
            >
              Login here
            </span>
          </p>
        </motion.div>
      </Paper>
    </div>
  );
};

export default RegisterPage;
