import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeTournament } from "./tournamentSlice";
export interface Filtres {
  filterName: string;
  filterType: string;
}
const initialState: Filtres = {
  filterName: "",
  filterType: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
    changeFilterType(state, action: PayloadAction<TypeTournament>) {
      state.filterType = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { changeFilterName, changeFilterType } = filterSlice.actions;
