import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store.ts";

export const WIDGETS = {
  PROJECT: "project",
  METRONOME: "metronome",
  KEYBOARD: "keyboard",
};

interface WidgetState {
  minimized: boolean;
  x: number;
  y: number;
}

interface WidgetsState {
  [key: string]: WidgetState;
}

const initialState: WidgetsState = {
  project: {
    minimized: false,
    x: 1480,
    y: 60,
  },
  metronome: {
    minimized: false,
    x: 1668,
    y: 160,
  },
  keyboard: {
    minimized: false,
    x: 20,
    y: 660,
  },
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    minimizeWidget(state, action: PayloadAction<string>) {
      state[action.payload].minimized = true;
    },
    restoreWidget(state, action: PayloadAction<string>) {
      state[action.payload].minimized = false;
    },
    moveWidget(
      state,
      action: PayloadAction<{ name: string; x: number; y: number }>,
    ) {
      state[action.payload.name].x = action.payload.x;
      state[action.payload.name].y = action.payload.y;
    },
  },
});

export const { minimizeWidget, restoreWidget, moveWidget } =
  widgetsSlice.actions;
export const selectWidgets = (state: AppState) => state.widgets;

export default widgetsSlice.reducer;
