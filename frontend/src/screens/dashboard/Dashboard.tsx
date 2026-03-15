import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/taskCard/TaskCard";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import type { TaskInterface } from "../../utilities/types";

import "./Dashboard.css";
import { getTaskList } from "../../utilities/commonFunctions";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskState = useSelector((state: RootState) => state.taskState);

  const handleAddTask = () => {
    navigate("/create-task");
  };

  useEffect(() => {
    if (!taskState.initialCall) {
      getTaskList(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="add-task-btn">
        <Button type="primary" onClick={handleAddTask}>
          <PlusOutlined /> Add a New Task
        </Button>
      </div>
      {taskState?.taskList?.length === 0 && (
        <div className="no-task-box">
          <p className="no-task-msg">
            <span>No Tasks Found.</span>
          </p>
        </div>
      )}
      <Row gutter={[20, 20]}>
        {taskState?.taskList.map((task: TaskInterface) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            status={task.status}
          />
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
