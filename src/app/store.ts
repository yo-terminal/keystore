import { configureStore } from "@reduxjs/toolkit";
import app from "./appSlice";
import root from "../features/root/rootSlice";
import dialogs from "../features/dialogs/dialogsSlice";

export const store = configureStore({
  reducer: {
    app,
    root,
    dialogs,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
