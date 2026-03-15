import { initailCallHandling, updateTaskState } from "../redux/taskSlicer";
import { getTasks } from "../services/apiRequest";
import type { AppDispatch } from "../redux/store";

export const getTaskList = (dispatch: AppDispatch, searchText?: string) => {
    getTasks(searchText)
      .then((result) => {
        dispatch(updateTaskState(result));
        dispatch(initailCallHandling());
      })
      .catch((error) => console.log(error));
  };