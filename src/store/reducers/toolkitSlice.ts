import { createSlice } from "@reduxjs/toolkit";
export interface CounterState {
  count: number;
  todos: string[];
}
const initialState: CounterState = {
  count: 0,
  todos: ["привет"],
};
const toolkitSlice = createSlice({
  name: "lol",
  initialState,
  reducers: {
    increment(state) {
      state.count = state.count + 1;
    },
  },
});

export default toolkitSlice.reducer;
export const { increment } = toolkitSlice.actions;
