import { deleteRequest, getRequest, postRequest, putRequest } from "./apis";
import type { TaskFormInterface } from "../utilities/types";

export const getTasks = async (searchText: string | undefined = undefined) => {
    const url = searchText ? `/tasks?search=${searchText}` : '/tasks'
    const result = await getRequest(url)
    .then(response => response)
    .catch(error => {
        throw error
    })
    return result
}

export const getTaskByID = async (id: string | undefined) => {
    const result = await getRequest(`/tasks/${id}`)
    .then(response => response)
    .catch(error => {
        throw error
    })
    return result
}

export const addNewTask = async (payload: TaskFormInterface) => {
    const result = await postRequest('/tasks', payload)
    .then(response => response)
    .catch(error => {
        throw error
    })
    return result
}

export const deleteTask = async (payload: string) => {
    const result = await deleteRequest(`/tasks/${payload}`)
    .then(response => response)
    .catch(error => {
        throw error
    })
    return result
}

export const editTaskById = async (id: string | undefined, payload: Partial<TaskFormInterface>) => {
    const result = await putRequest(`/tasks/edit/${id}`, payload)
    .then(response => response)
    .catch(error => {
        throw error
    })
    return result
}