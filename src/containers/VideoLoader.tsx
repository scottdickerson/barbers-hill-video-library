import React, { useEffect, useState } from "react";
import { IVideo } from "../components/VideoTile";

interface IVideoLoaderTypes {
  children: React.ReactNode;
}

const VideoLoader = ({ children }: IVideoLoaderTypes) => {
  // TODO: I would love to play with react query here if time
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api")
      .then((response) => response.json())
      .then((fetchedVideos) => setVideos(fetchedVideos));
  }, []);
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              videos,
            })
          : null
      )}
    </>
  );
};

export default VideoLoader;
