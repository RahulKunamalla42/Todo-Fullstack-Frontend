import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useChangeStatusoftodoMutation } from "../../redux/services/authApi";

const ViewAndAddTasks = ({ todos }) => {
  const navigate = useNavigate();
  const [changeStatusoftodo] = useChangeStatusoftodoMutation();
  const [usertodos, setUserTodos] = useState([]);
  const [page, setPage] = useState(1);
  const tasksPerPage = 3;

  useEffect(() => {
    if (todos) {
      setUserTodos(todos);
    }
  }, [todos]);

  const currentTasks = usertodos.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  const handleNext = () => {
    if (page * tasksPerPage < usertodos.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  const userid = localStorage.getItem("userid");
  const handleComplete = async ({ taskid, completed }) => {
    await changeStatusoftodo({ userid, taskid, completed });
    setUserTodos((prev) =>
      prev.map((task) =>
        task.todoid === taskid ? { ...task, isCompleted: completed } : task
      )
    );
  };

  const handleOpen = (todoid) => {
    navigate(`/todopage/${todoid}`);
  };

  return (
    <div className="min-h-[28rem] flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      {/* Task List */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Paper
          className="p-6 shadow-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg"
          elevation={10}
        >
          {/* Task Cards */}
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <div
                key={task.todoid}
                className={`mb-4 p-4 ${
                  task.isCompleted ? "bg-green-500" : "bg-slate-500"
                } rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}
              >
                <Typography
                  variant="h6"
                  className="text-lg font-bold text-white"
                >
                  {task.todotitle}
                </Typography>

                <div className="flex gap-2 flex-wrap">
                  {task.isCompleted ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        handleComplete({
                          taskid: task.todoid,
                          completed: !task.isCompleted,
                        })
                      }
                    >
                      COMPLETED
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        handleComplete({
                          taskid: task.todoid,
                          completed: !task.isCompleted,
                        })
                      }
                    >
                      INCOMPLETE
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleEdit(task.todoid)}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleOpen(task.todoid)}
                  >
                    OPEN
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h6" className="text-center text-white mt-4">
              No tasks available.
            </Typography>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Typography variant="body1" className="text-white">
              Page {page}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleNext}
              disabled={page * tasksPerPage >= usertodos.length}
            >
              Next
            </Button>
          </div>
        </Paper>
      </motion.div>
    </div>
  );
};

export default ViewAndAddTasks;
