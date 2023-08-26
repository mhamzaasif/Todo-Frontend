import React from "react";
import Login from "./Pages/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import WithUserLogin from "./HOC/WithUserLogIn";
import { ToastContainer } from "react-toastify";
import CreateTodo from "./Pages/CreateTodo";
import TodoList from "./Pages/TodoList";
import AppContextProvider from "./Contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<WithUserLogin />}>
            <Route path="/list-tasks" element={<TodoList />} />
            <Route path="/create-task" element={<CreateTodo />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;
