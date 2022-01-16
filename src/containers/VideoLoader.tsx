import React, { useEffect, useState } from "react";
import { IVideo } from "../components/VideoTile";

interface IVideoLoaderTypes {
  children: React.ReactNode;
  serverURL: string;
}

const VideoLoader = ({ children, serverURL }: IVideoLoaderTypes) => {
  // TODO: I would love to play with react query here if time
  const [videos, setVideos] = useState<IVideo[]>([]);

  const [introduction, setIntroduction] = useState<string>();

  useEffect(() => {
    // get videos
    fetch(`${serverURL}/api`)
      .then((response) => response.json())
      .then((fetchedVideos) => setVideos(fetchedVideos));

    // get introduction
    fetch(`${serverURL}/api/overview`)
      .then((response) => response.json())
      .then(({ introduction: fetchedIntroduction }) => {
        setIntroduction(fetchedIntroduction);
      });
  }, [serverURL]);
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              videos,
              introduction,
              serverURL,
            })
          : null
      )}
    </>
  );
};

export default VideoLoader;
