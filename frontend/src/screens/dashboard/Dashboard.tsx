import { useState } from 'react'
import Button from "@mui/material/Button";
import Header from "../../components/header/Header.js";

import './Dashboard.css'

const Dashboard = () => {
  const [isAddTaskEnable, setIsTaskEnable] = useState(false)

  const handleAddTask = () => {
    console.log('clicked')
    setIsTaskEnable(true)
  }
  return (
    <div>
      <Header />
      <div className="add-task-container">
        <Button variant="contained" onClick={handleAddTask}>Add a New Task</Button>
      </div>
      Dashboard
    </div>
  );
};

export default Dashboard;
