import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./reducers/toolkitSlice";

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
