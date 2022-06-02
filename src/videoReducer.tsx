import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IVideo } from "./components/VideoTile";

export interface IVideosState {
  videos: { status: string; data: IVideo[] };
  overview: { status: string; data: { introduction: string } };
}

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (serverURL: string) => {
    return fetch(`${serverURL}`).then((response) => response.json());
  }
);

export const fetchOverview = createAsyncThunk(
  "videos/fetchOverview",
  async (serverURL: string) => {
    return fetch(`${serverURL}/overview`).then((response) => response.json());
  }
);

export const videoSlice = createSlice({
  name: "videos",
  initialState: { data: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      });
  },
});

export const overviewSlice = createSlice({
  name: "overview",
  initialState: { data: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      });
  },
});
