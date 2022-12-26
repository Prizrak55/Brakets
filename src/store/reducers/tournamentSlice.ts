import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum StatusTournament {
  active,
  inactive,
}
export enum TypeTournament {
  singleElimination,
  doubleElimination,
  roundRobin,
  groupState,
}

export interface TournamentsState {
  id: string;
  name: string;
  status: StatusTournament;
  createAt: Date;
  type: TypeTournament;
  comands?: string[];
}

const initialState: any = {
  tournaments: [],
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTourtaments(state, action: PayloadAction<TournamentsState>) {
      state.tournaments = action.payload;
    },
  },
});

export default tournamentSlice.reducer;
export const { setTourtaments } = tournamentSlice.actions;
