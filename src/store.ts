import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import tracksSlice from "./stores/tracksSlice.ts";
import widgetsSlice from "./stores/widgetsSlice.ts";
import dialogSlice from "./stores/dialogSlice.ts";

export const store = configureStore({
  reducer: {
    dialog: dialogSlice,
    tracks: tracksSlice,
    widgets: widgetsSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
