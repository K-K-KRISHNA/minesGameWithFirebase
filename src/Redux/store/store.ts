import { configureStore } from "@reduxjs/toolkit";
import numberSlice from "../slices/numSlice";

export const store = configureStore({
  reducer: {
    numberSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
