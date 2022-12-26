import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterSlice from "./reducers/filterSlice";

import toolkitSlice from "./reducers/toolkitSlice";
import tournamentSlice from "./reducers/tournamentSlice";

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
  tournament: tournamentSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
