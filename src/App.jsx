/** @format */

import "./App.css";
import { ToastContainer } from "react-toastify";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./ComponentLayout/Layout";
import Setting from "./ComponentLayout/Setting";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./Pages/LoginPage/Login";
import Home from "./Pages/HomePage/Home";
import Register, {
  action as registerAction,
} from "./Pages/RegisterPage/Register";
import TodoLayout from "./Pages/TodoPage/TodoLayout/TodoLayout";
import NotFoundPage from "./ComponentLayout/NotFoundPage";
import TodoItems from "./Pages/TodoPage/TodoItems/TodoItems";
import CompletedTodos from "./Pages/TodoPage/TodoItems/CompletedTodos";
import TodoItemsMessage from "./Pages/TodoPage/TodoItems/TodoItemsMessage";
import Error from "./ComponentLayout/Error";
import { requiredAuth } from "./ComponentLayout/Hooks/utils";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route
          path="login"
          element={<Login />}
          errorElement={<Error />}
          loader={loginLoader} //loader for login page
          action={loginAction}
        />
        <Route
          path="todo"
          element={<TodoLayout />}
          errorElement={<Error />}
          loader={({ request }) => requiredAuth(request)}>
          <Route
            index
            element={<TodoItemsMessage />}
            errorElement={<Error />}
            loader={({ request }) => requiredAuth(request)}
          />
          <Route
            path="addToDo"
            element={<TodoItems />}
            errorElement={<Error />}
            loader={({ request }) => requiredAuth(request)}
          />
          <Route
            path="completed"
            element={<CompletedTodos />}
            errorElement={<Error />}
            loader={({ request }) => requiredAuth(request)}
          />
        </Route>
        <Route
          path="settings"
          element={<Setting />}
          errorElement={<Error />}
          loader={({ request }) => requiredAuth(request)}
        />
        <Route
          path="register"
          element={<Register />}
          action={registerAction}
          errorElement={<Error />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
