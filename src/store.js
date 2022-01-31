import { configureStore } from "@reduxjs/toolkit";
import { videoSlice, overviewSlice } from "./videoReducer";

export default configureStore({
  reducer: { videos: videoSlice.reducer, overview: overviewSlice.reducer },
});
