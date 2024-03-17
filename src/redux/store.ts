import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { listSlice } from "./listSlice";

const rootReducer = combineReducers({
  list: listSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
