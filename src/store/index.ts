import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import filterSlice from "./reducers/filterSlice";
import tournamentSlice from "./reducers/tournamentSlice";
import teamSlice from "./reducers/teamSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
  tournament: tournamentSlice,
  filter: filterSlice,
  team: teamSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
