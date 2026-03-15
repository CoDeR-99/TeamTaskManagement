import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskInterface } from "../utilities/types";

interface TaskState {
  taskList: TaskInterface[];
  initialCall: boolean;
}

const initialState: TaskState = {
  taskList: [],
  initialCall: false,
};

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {
    updateTaskState: (state, action: PayloadAction<TaskInterface[]>) => {
      state.taskList = action.payload;
    },
    initailCallHandling: (state) => {
      state.initialCall = true;
    }
  },
});

export const { updateTaskState, initailCallHandling } = taskSlice.actions;

export default taskSlice.reducer;
