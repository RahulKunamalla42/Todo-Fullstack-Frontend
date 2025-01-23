import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import TodoPage from "./pages/user/TodoPage.jsx";
import AddTodo from "./pages/Addtodo.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EditPage from "./pages/user/EditPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: `/todopage/:todoid`,
    element: <TodoPage />,
  },
  {
    path: "/addpage",
    element: <AddTodo />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/edit/:todoid",
    element:<EditPage/>
  }
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
