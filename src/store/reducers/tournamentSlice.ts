import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  comands?: string[];
}
export interface TournamentsState {
  tournaments: Tournament[];
}
const initialState: TournamentsState = {
  tournaments: [],
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTourtaments(state, action: PayloadAction<Tournament[]>) {
      state.tournaments = action.payload;
    },
  },
});

export default tournamentSlice.reducer;
export const { setTourtaments } = tournamentSlice.actions;
