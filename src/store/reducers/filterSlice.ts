import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  filterName: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterNameName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { changeFilterNameName } = filterSlice.actions;
