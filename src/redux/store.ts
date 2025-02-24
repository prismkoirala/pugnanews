import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;