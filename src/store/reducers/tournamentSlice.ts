import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export enum StatusTournament {
  Inactive,
  Active,
}
export type TypeTournament =
  | "singleElimination"
  | "doubleElimination"
  | "roundRobin"
  | "groupState"
  | "";

export interface Tournament {
  id: string;
  name: string;
  status: StatusTournament;
  createAt: Date;
  type: TypeTournament;
  teams?: string[];
}
export interface TournamentsState {
  tournaments: Tournament[];
  status: null | string;
  error: string;
  tournament: Tournament | null;
}

export const createNewTournament = createAsyncThunk(
  "tournament/createNewTournament",
  async function (data: Tournament, { fulfillWithValue, dispatch }) {
    await axios
      .post("http://localhost:3000/brackets", data)
      .then(() => dispatch(createTournament(data)))
      .catch((err) => fulfillWithValue(err.message));
  }
);
export const getTournaments = createAsyncThunk(
  "tournament/getTournaments",
  async function (_, { rejectWithValue }) {
    const tournaments = await axios
      .get<Tournament[]>(`http://localhost:3000/brackets`)
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.message));

    return tournaments;
  }
);
export const getOneTournament = createAsyncThunk(
  "tournament/getOneTournament",
  async function (id: string, { fulfillWithValue, dispatch }) {
    const response = await axios
      .get(`http://localhost:3000/brackets/${id}`)
      .then((response) => response.data)
      .catch((err) => fulfillWithValue(err.message));

    return response;
  }
);
export const updateOneTournament = createAsyncThunk(
  "tournament/updateTournament",
  async function (data: Tournament, { fulfillWithValue, dispatch }) {
    await axios
      .put(`http://localhost:3000/brackets/${data.id}`, data)
      .then(() => dispatch(updateTourtament(data)))
      .catch((err) => fulfillWithValue(err.message));
  }
);
export const deleteTournament = createAsyncThunk(
  "tournament/deleteTournament",
  async function (id: string, { rejectWithValue, dispatch }) {
    await axios
      .delete(`http://localhost:3000/brackets/${id}`)
      .then(() => dispatch(removeTourtament(id)))
      .catch((err) => rejectWithValue(err.message));
  }
);

const initialState: TournamentsState = {
  tournaments: [],
  tournament: null,
  status: null,
  error: "",
};

// const ErrorHandler = (state, action) => {
//   state.status = "rejected";
//   state.error = action.payload;
// };

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    removeTourtament(state, action: PayloadAction<string>) {
      state.tournaments = state.tournaments.filter(
        (tournament) => tournament.id !== action.payload
      );
    },
    updateTourtament(state, action: PayloadAction<Tournament>) {
      state.tournaments.forEach((element) => {
        if (element.id === action.payload.id) {
          element = action.payload;
        }
      });
    },
    createTournament(state, action: PayloadAction<Tournament>) {
      state.tournaments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //getTournaments
    builder.addCase(getTournaments.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(getTournaments.fulfilled, (state, action) => {
      state.status = "resolved";
      state.tournaments = action.payload;
    });

    //getOneTournament
    builder.addCase(getOneTournament.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(getOneTournament.fulfilled, (state, action) => {
      state.status = "resolved";
      state.tournament = action.payload;
    });

    //rejected cases
    builder.addCase(getTournaments.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
    builder.addCase(deleteTournament.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
    builder.addCase(getOneTournament.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
    builder.addCase(createNewTournament.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export default tournamentSlice.reducer;
export const { removeTourtament, updateTourtament, createTournament } =
  tournamentSlice.actions;
