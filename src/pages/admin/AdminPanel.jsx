import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Delete } from "@mui/icons-material";
import "../../index.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import {
  useGetUsersQuery,
  useLazyDeleteUserQuery,
} from "../../redux/services/authApi";

const AdminPanel = () => {
  const [deleteUser] = useLazyDeleteUserQuery();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { data } = useGetUsersQuery();

  useEffect(() => {
    setUsers(data?.userDtos || []);
  }, [data]);

  const currentUserid = localStorage.getItem("userid");

  const handleDeleteUser = (userid) => {
    if (userid != currentUserid) {
      deleteUser(userid);
      window.location.reload();
    } else {
      alert("You are logged in; you cannot delete your own account.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-300">
          Admin Panel
        </h1>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            className="text-sm sm:text-base"
          >
            Logout
          </Button>
          <Avatar
            alt="Admin Avatar"
            className="cursor-pointer"
            sx={{ bgcolor: "#1e293b" }}
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-400 text-center">
            User List
          </h2>
          <div className="space-y-3">
            {users.length > 0 ? (
              users.map((user) => (
                <Paper
                  key={user.id}
                  className="p-4 bg-gray-800 rounded-md shadow-md flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </Paper>
              ))
            ) : (
              <p className="text-gray-400 text-center">No users found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
