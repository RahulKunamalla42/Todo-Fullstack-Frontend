import React, { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import {
  Button,
  Avatar,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import "../../index.css";
import ViewAndAddTasks from "./ViewAndAddTasks";
import {
  useGetProfileQuery,
  useLazyGetTodosQuery,
} from "../../redux/services/authApi";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const navigate = useNavigate();

  const userid = localStorage.getItem("userid") || "";
  const { data, isLoading, error } = useGetProfileQuery(userid);
  const [getTodos, { data: todos }] = useLazyGetTodosQuery();
  const [usertodos, setUserTodos] = useState([]);
  const [taskCount, setTaskCount] = useState({ completed: 0, inComplete: 0 });

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    navigate("/login");
    window.location.reload();
  };

  // Fetch Todos when profile data is available
  useEffect(() => {
    if (data) {
      getTodos(userid);
    }
  }, [data, getTodos, userid]);

  // Update todos state when fetched todos change
  useEffect(() => {
    if (todos?.todoDTOS) {
      setUserTodos(todos.todoDTOS);
    }
  }, [todos]);

  // Calculate completed and pending tasks
  useEffect(() => {
    if (usertodos.length > 0) {
      const completedTasks = usertodos.filter(
        (task) => task.isCompleted
      ).length;
      const pendingTasks = usertodos.filter((task) => !task.isCompleted).length;
      setTaskCount({ completed: completedTasks, inComplete: pendingTasks });
    }
  }, [usertodos]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <ErrorPage />;
  }

  // Navigate to Add Task Page
  const handleAdd = () => {
    navigate("/addpage");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-extrabold text-gray-200">
          Todo Application
        </h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl flex flex-col gap-6"
      >
        <Paper
          className="p-8 shadow-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg"
          elevation={10}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <Avatar alt="User Avatar" sx={{ width: 80, height: 80 }} />
              <div>
                <h2 className="text-3xl font-bold">
                  Hello, {data?.userDTO?.username?.toUpperCase()}
                </h2>
                <p className="text-gray-400">Welcome back to your tasks!</p>
                <p className="text-gray-400">{data?.userDTO?.email}</p>
              </div>
            </motion.div>

            {/* Task Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold">Task Summary</h3>
              <p className="text-lg">
                <span className="text-green-400 font-bold">
                  {taskCount.completed}
                </span>{" "}
                completed |
                <span className="text-red-400 font-bold">
                  {taskCount.inComplete}
                </span>{" "}
                incompleted
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-8 justify-center"
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "blue",
                color: "#fff",
                padding: "12px 24px",
              }}
              className="hover:shadow-lg transition-transform transform hover:scale-105"
              onClick={handleAdd}
            >
              Add Task
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "red",
                color: "#fff",
                padding: "12px 24px",
              }}
              className="hover:shadow-lg transition-transform transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </motion.div>
        </Paper>

        {
          usertodos && usertodos.length>0?<ViewAndAddTasks todos={usertodos} />:<></>
        }
        
      </motion.div>
    </div>
  );
};

export default UserPanel;
