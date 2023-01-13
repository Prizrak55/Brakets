import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Team {
  id: string;
  name: string;
}
export interface Teams {
  teams: Team[];
}

const initialState: Teams = {
  teams: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
  },
});

export default teamSlice.reducer;
export const { addTeam } = teamSlice.actions;
