import "./App.css";
import PullScreen from "./components/PullScreen";
import VideoList from "./components/VideoList";
import VideoLoader from "./containers/VideoLoader";
import VideoListContainer from "./containers/VideoListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const serverURL =
    process.env.REACT_APP_SERVER_URL || "http://127.0.0.1:3000/api";
  return (
    <BrowserRouter>
      {serverURL ? ( // only render everything once we know which server URL to use
        // We want to render BOTH on this route, but hide each depending on the URL so the videos preload and don't reload everytime we switch pages
        <>
          <VideoLoader serverURL={serverURL}></VideoLoader>
          <Routes>
            <Route
              element={
                <VideoListContainer serverURL={serverURL}>
                  <VideoList />
                </VideoListContainer>
              }
              path="/videoList"
            />
            <Route element={<PullScreen />} path="/" />
          </Routes>
        </>
      ) : null}
    </BrowserRouter>
  );
}

export default App;
