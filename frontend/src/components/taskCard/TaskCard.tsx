import { Col, Button, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import Card from "antd/es/card/Card";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import type { TaskInterface } from "../../utilities/types";
import { deleteTask } from "../../services/apiRequest";

import "./TaskCard.css";
import { getTaskList } from "../../utilities/commonFunctions";

const TaskCard = (props: TaskInterface) => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const getStatusTag = (status: string) => {
    switch (status) {
      case "TODO":
        return <Tag color="blue">TODO</Tag>;
      case "IN_PROGRESS":
        return <Tag color="orange">IN PROGRESS</Tag>;
      case "DONE":
        return <Tag color="green">DONE</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case "LOW":
        return <Tag color="green">LOW</Tag>;
      case "MEDIUM":
        return <Tag color="gold">MEDIUM</Tag>;
      case "HIGH":
        return <Tag color="red">HIGH</Tag>;
      default:
        return <Tag>{priority}</Tag>;
    }
  };

  const handleEditTask = () => {
    navigate(`/editTask/${props.id}`);
  };

  const handleDeleteTask = () => {
    deleteTask(props.id)
      .then((result) => {
        console.log(result)
        getTaskList(dispatch)
        message.success('Task Deleted Successfully.')
      })
      .catch(() => {
        message.error('Error occur while deleting Task.');
      });
  };

  const extraContent = (
    <div>
      <Button
        type="primary"
        danger
        className="del-btn"
        onClick={handleDeleteTask}
      >
        <DeleteOutlined />
      </Button>
    </div>
  );
  return (
    <Col span={8}>
      <Card className="card" title={props?.title} extra={extraContent}>
        <p>{props?.description}</p>
        <div className="status-priority-box">
          <div className="priority-box">
            <div className="label-status">{"Priority"}</div>
            <div>{getPriorityTag(props?.priority)}</div>
          </div>
          <div className="priority-box">
            <div className="label-status">{"Status"}</div>
            <div>{getStatusTag(props?.status)}</div>
          </div>
        </div>
        <div className="edit-btn-box">
          <Button type="primary" className="edit-btn" onClick={handleEditTask}>
            <EditOutlined /> Edit Task
          </Button>
        </div>
      </Card>
    </Col>
  );
};

export default TaskCard;
