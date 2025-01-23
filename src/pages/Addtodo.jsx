import React, { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useAddTodoMutation } from "../redux/services/authApi";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const [addTodo, { data, isLoading, error }] = useAddTodoMutation();

  const [todo, setTodo] = useState({
    todotitle: "",
    tododescription: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!todo.todotitle || !todo.tododescription) {
      alert("Both Title and Description are required!");
      return;
    }
    if (!userid) {
      alert("User ID is missing! Please log in again.");
      return;
    }
    try {
      addTodo({ userid, todo });
      alert("Todo added successfully!");
      if (confirm("Do you want to add another todo?")) {
        navigate("/addpage");
      } else {
        navigate("/");
        window.location.reload();
      }
      setTodo({
        todotitle: "",
        tododescription: "",
        isCompleted: false,
      });
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <Paper className="p-6 w-full max-w-sm bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-2xl">
        <div className="mb-6 text-center">
          <Typography variant="h4" className="text-2xl font-bold mb-2">
            Add Todo
          </Typography>
          <Typography className="text-gray-400 text-sm">
            Create a new task to stay organized
          </Typography>
        </div>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="todotitle"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name="todotitle"
              value={todo.todotitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
              placeholder="Enter Todo Title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="tododescription"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              name="tododescription"
              value={todo.tododescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
              placeholder="Enter Todo Description"
              rows="3"
            />
          </div>

          {/* Add Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAdd}
            disabled={isLoading}
            className="mt-4"
          >
            {isLoading ? "Adding..." : "Add Todo"}
          </Button>

          {/* Error Message */}
          {error && (
            <Typography
              color="error"
              className="mt-4 text-center text-red-400 text-sm"
            >
              Error: {error.data?.message || "Failed to add Todo"}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default AddTodo;
