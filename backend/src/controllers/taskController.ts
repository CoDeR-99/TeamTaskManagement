import {Request, Response} from "express";
import { tasks } from "../data/taskStore";
import { Task } from "../models/taskModel";
const { v4: uuidv4 } = require('uuid');

export const getTasks = (req: Request, res: Response) => {
    const search = req.query.search as String

    if(search){
        const filteredTasks = tasks.filter((task) => 
            task.title.toLowerCase().includes(search.toLowerCase())
        );
        return res.json(filteredTasks)
    }
    res.json(tasks)
}

export const getTaskById = (req: Request, res: Response) => {
    const {id} = req.params;

    const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task Not Found.",
    });
  }

  res.json(task);
}

export const createTask = (req: Request, res: Response) => {
    const {title, description, priority, status} = req.body;
    if(!title){
        return res.status(400).json({message: 'Title is required'});
    }

    const validPriority = ['LOW', 'MEDIUM', 'HIGH'];
    const validStatus = ['TODO', 'IN_PROGRESS', 'DONE']

    if(!validPriority.includes(priority)){
        return res.status(400).json({message: 'Invalid Priority value'})
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({message: 'Invalid Status value'})
    }

    const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        priority,
        status
    }

    tasks.push(newTask)

    res.status(201).json({
        message: 'task created successfully',
        createdTask: newTask
    })
}

export const deleteTask = (req: Request, res: Response) => {
    const {id} = req.params;

    const index = tasks.findIndex(task => task.id === id)

    if(index === -1){
        return res.status(400).json({
            message: "Task Not Found."
        })
    }

    tasks.splice(index, 1);
    res.json({
        message: 'Task Deleted Successfully.'
    })
}

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task Not Found.",
    });
  }

  const validPriority = ["LOW", "MEDIUM", "HIGH"];
  const validStatus = ["TODO", "IN_PROGRESS", "DONE"];

  if (priority && !validPriority.includes(priority)) {
    return res.status(400).json({
      message: "Invalid Priority value",
    });
  }

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid Status value",
    });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (status !== undefined) task.status = status;

  res.json({
    message: "Task Updated Successfully",
    updatedTask: task,
  });
};