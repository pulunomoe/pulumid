import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store.ts";

export const DIALOGS = {
  ADD_TRACK: "addTrack",
  DELETE_TRACK: "deleteTrack",
};

const initialState = {
  name: null as string | null,
  param: undefined as string | undefined,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog(state, action: PayloadAction<{ name: string; param?: string }>) {
      state.name = action.payload.name;
      state.param = action.payload.param;
    },
    closeDialog(state) {
      state.name = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const selectDialogName = (state: AppState) => state.dialog.name;
export const selectDialogParam = (state: AppState) => state.dialog.param;

export default dialogSlice.reducer;
