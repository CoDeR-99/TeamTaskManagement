import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Radio from "antd/es/radio";
import { message } from "antd";
import { addNewTask, getTaskByID, editTaskById } from "../../services/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getTaskList } from "../../utilities/commonFunctions";
import { useEffect, useState } from "react";
import type { TaskFormInterface } from "../../utilities/types";

import "./TaskForm.css";



const TaskForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const isEditable = location.pathname.includes("/editTask");
  const { id } = useParams<{ id: string }>();
  const [editTask, setEditTask] = useState<TaskFormInterface>();

  const onFinish = (values: TaskFormInterface) => {
    addNewTask(values)
      .then((result) => {
        console.log(result);
        message.success("Task created successfully");
        getTaskList(dispatch);
        navigate("/tasks");
      })
      .catch(() => {
        message.error('Error occur while creating Task.');
      });
    form.resetFields();
  };

  const handleEdit = (values: TaskFormInterface) => {
    const isEditTitle = values.title?.trim() != editTask?.title?.trim()
    const isEditDesc = values.description?.trim() != editTask?.description?.trim()
    const isEditPriority = values.priority?.trim() != editTask?.priority?.trim()
    const isEditStatus = values.status?.trim() != editTask?.status?.trim()
    type payloadInterface = Partial<TaskFormInterface>
    const payload: payloadInterface = {}
    if(isEditTitle){
      payload.title= values.title
    }
    if(isEditDesc){
      payload.description= values.description
    }
    if(isEditPriority){
      payload.priority= values.priority
    }
    if(isEditStatus){
      payload.status= values.status
    }
    if(Object.keys(payload).length === 0){
      console.log("Nothing to edit")
      return
    }
    editTaskById(id, payload)
      .then((result) => {
        console.log(result);
        getTaskList(dispatch);
        message.success("Task updated successfully");
        navigate("/tasks");
      })
      .catch(() => {
        message.error('Error occur while editing Task.');
      });
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  useEffect(() => {
    if (isEditable) {
      getTaskByID(id)
        .then((result) => setEditTask(result))
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title: editTask?.title,
      description: editTask?.description,
      priority: editTask?.priority,
      status: editTask?.status,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTask]);

  return (
    <div className="formContainer">
      {isEditable && <h1 className="form-title">Edit Task</h1>}
      {!isEditable && <h1 className="form-title">Create New Task</h1>}
      <Form
        className="form-section"
        form={form}
        layout="vertical"
        onFinish={isEditable ? handleEdit : onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please select priority" }]}
        >
          <Radio.Group>
            <Radio value="HIGH">HIGH</Radio>
            <Radio value="MEDIUM">MEDIUM</Radio>
            <Radio value="LOW">LOW</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Radio.Group>
            <Radio value="TODO">TODO</Radio>
            <Radio value="IN_PROGRESS">IN_PROGRESS</Radio>
            <Radio value="DONE">DONE</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item className="form-btn-container">
          <Button className="cancel-btn" type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {isEditable ? "Edit Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
