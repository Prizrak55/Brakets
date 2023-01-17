import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Team {
  id: string;
  name: string;
}
export interface Teams {
  teams: Team[];
  status: null | string;
  error: any;
}

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async function (_, { rejectWithValue }) {
    const teams = await axios
      .get<Team[]>("http://localhost:3000/teams")
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.message));

    return teams;
  }
);

const initialState: Teams = {
  teams: [],
  status: null,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeams.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.status = "resolved";
      state.teams = action.payload;
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export default teamSlice.reducer;
export const { addTeam } = teamSlice.actions;
