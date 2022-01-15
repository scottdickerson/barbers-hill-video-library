import React from "react";
import "./App.css";
import PullScreen from "./components/PullScreen";
import VideoList from "./components/VideoList";
import VideoLoader from "./containers/VideoLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PullScreen />}></Route>
        <Route
          path="/videoList"
          element={
            <VideoLoader>
              <VideoList />
            </VideoLoader>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
