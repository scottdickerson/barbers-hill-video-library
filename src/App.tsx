import "./App.css";
import PullScreen from "./components/PullScreen";
import VideoList from "./components/VideoList";
import VideoLoader from "./containers/VideoLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { determineAPIServerLocation } from "./utils";

function App() {
  const [serverURL, setServerURL] = useState<string>();

  useEffect(() => {
    determineAPIServerLocation().then((actualServerURL) =>
      setServerURL(actualServerURL)
    );
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PullScreen />}></Route>
        <Route
          path="/videoList"
          element={
            serverURL ? ( // only render everything once we know which server URL to use
              <VideoLoader serverURL={serverURL}>
                <VideoList />
              </VideoLoader>
            ) : null
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
