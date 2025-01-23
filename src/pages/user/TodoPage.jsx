import React, { useState, useEffect } from "react";
import { IconButton, Paper, Typography, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLazyDeleteTodoQuery,
  useGetTodosQuery,
} from "../../redux/services/authApi";

const TodoPage = () => {
  const userid = localStorage.getItem("userid");
  const [deleteTodo] = useLazyDeleteTodoQuery();
  const { data } = useGetTodosQuery(userid);
  const [currentTodo, setCurrentTodo] = useState({});

  const { todoid } = useParams();
  console.log(todoid);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data?.todoDTOS) {
      const curtodo = data.todoDTOS.find(
        (todo) => String(todo.todoid) === todoid
      ); // Ensure type conversion
      console.log(curtodo);
      setCurrentTodo(curtodo || {}); // Fallback to an empty object
    }
  }, [data, todoid]); // Include todoid as a dependency

  const handleEdit = () => {
    navigate(`/edit/${todoid}`);
  };

  const handleDelete = () => {
    try {
      deleteTodo({ userid, todoid });
      navigate("/");
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Paper className="p-6 w-full max-w-md bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4" className="text-lg font-bold">
            Todo Details
          </Typography>
          <div>
            <IconButton onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
            <IconButton onClick={() => handleEdit()} color="primary">
              <Edit />
            </IconButton>
          </div>
        </div>
        <div>
          <Typography variant="h6" className="text-black mb-4">
            <strong>Title:</strong>{" "}
            {(currentTodo && currentTodo.todotitle) || "N/A"}
          </Typography>
          <Typography variant="h6" className="text-black mb-4">
            <strong>Description:</strong>{" "}
            {(currentTodo && currentTodo.tododescription) || "N/A"}
          </Typography>
          <Typography variant="h6" className="text-black mb-4">
            <strong>Completed:</strong>{" "}
            {currentTodo && currentTodo.isCompleted ? "Yes" : "No"}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default TodoPage;
