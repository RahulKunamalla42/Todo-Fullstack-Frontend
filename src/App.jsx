import React, { useEffect, useState } from "react";
import UserPanel from "./pages/user/UserPanel";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/admin/AdminPanel";
import TodoPage from "./pages/user/TodoPage";

const App = () => {
  // return <TodoPage/>
  const [regOrLog, setRegOrLog] = useState(true);
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setRole(role);
    setToken(token);
  }, []);

  if (token) {
    if (role === "ADMIN") {
      return <AdminPanel />;
    } else if (role === "USER") {
      return <UserPanel />;
    }
  }

  return regOrLog ? (
    <LoginPage setRegOrLog={setRegOrLog} />
  ) : (
    <RegisterPage setRegOrLog={setRegOrLog} />
  );
};

export default App;
