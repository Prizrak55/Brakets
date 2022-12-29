import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import filterSlice from "./reducers/filterSlice";
import toolkitSlice from "./reducers/toolkitSlice";
import tournamentSlice from "./reducers/tournamentSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
  tournament: tournamentSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
