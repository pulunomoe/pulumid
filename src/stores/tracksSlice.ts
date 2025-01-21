import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store.ts";

interface Track {
  name: string;
  instrument: string;
}

const initialState: Track[] = [];

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    addTrack(state, action: PayloadAction<Track>) {
      state.push(action.payload);
    },
    deleteTrack(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addTrack, deleteTrack } = tracksSlice.actions;
export const selectTracks = (state: AppState) => state.tracks;

export default tracksSlice.reducer;
