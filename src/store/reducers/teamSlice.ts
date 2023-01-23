import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Team {
  id: string;
  name: string;
  players: string[];
  reservePlayers: string[];
}
export interface Teams {
  teams: Team[];
  team: null | Team;
  status: null | string;
  error: null | string | unknown;
}

export const createNewTeam = createAsyncThunk(
  "team/createNewTeam",
  async function (data: Team, { rejectWithValue, dispatch }) {
    await axios
      .post("http://localhost:3000/teams", data)
      .then(() => dispatch(addTeam(data)))
      .catch((err) => rejectWithValue(err.message));
  }
);

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
export const getTeam = createAsyncThunk(
  "team/getTeam",
  async function (id: string, { rejectWithValue }) {
    const team = await axios
      .get<Team>(`http://localhost:3000/teams/${id}`)
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.message));

    return team;
  }
);
export const updateOneTeam = createAsyncThunk(
  "team/updateOneTeam",
  async function (data: Team, { fulfillWithValue, dispatch }) {
    await axios
      .put(`http://localhost:3000/teams/${data.id}`, data)
      .then(() => dispatch(updateTeam(data)))
      .catch((err) => fulfillWithValue(err.message));
  }
);
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async function (id: string, { rejectWithValue, dispatch }) {
    await axios
      .delete(`http://localhost:3000/teams/${id}`)
      .then(() => dispatch(removeTeam(id)))
      .catch((err) => rejectWithValue(err.message));
  }
);

const initialState: Teams = {
  teams: [],
  team: null,
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
    updateTeam(state, action: PayloadAction<Team>) {
      state.teams.forEach((element) => {
        if (element.id === action.payload.id) {
          element = action.payload;
        }
      });
    },
    removeTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
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

    builder.addCase(getTeam.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.status = "resolved";
      state.team = action.payload;
    });
    builder.addCase(getTeam.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export default teamSlice.reducer;
export const { addTeam, updateTeam, removeTeam } = teamSlice.actions;
