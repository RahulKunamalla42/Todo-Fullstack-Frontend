import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../redux/services/authApi";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const { todoid } = useParams();
  const [updateTodo] = useUpdateTodoMutation();
  const { data } = useGetTodosQuery(userid);
  const [todo, setTodo] = useState({
    todotitle: "",
    tododescription: "",
    isCompleted: false,
  });

  // Fetch the current todo based on the todoid
  useEffect(() => {
    if (data?.todoDTOS) {
      const curtodo = data.todoDTOS.find(
        (todo) => String(todo.todoid) === todoid
      );
      if (curtodo) {
        setTodo({
          todotitle: curtodo.todotitle || "",
          tododescription: curtodo.tododescription || "",
          isCompleted: curtodo.isCompleted || false,
        });
      } else {
        console.error("Todo not found for the given ID.");
      }
    }
  }, [data, todoid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (todo.todotitle.trim() && todo.tododescription.trim()) {
      try {
        updateTodo({ userid, todoid, todo });
        navigate("/"); // Redirect to the homepage after updating
      } catch (err) {
        console.error("Error updating todo:", err);
      }
    } else {
      alert("Both Title and Description are required!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center mb-6">
          <span className="text-2xl font-semibold text-gray-700">
            Edit Todo
          </span>
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title:
          </label>
          <input
            id="title"
            name="todotitle"
            type="text"
            value={todo.todotitle}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="tododescription"
            value={todo.tododescription}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            className="mt-4"
          >
            Update Todo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
