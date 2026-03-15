import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../screens/dashboard/Dashboard";
import TaskForm from "../screens/addTask/TaskForm";
import Header from "../components/header/Header";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="router-container">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<Dashboard />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/editTask/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
