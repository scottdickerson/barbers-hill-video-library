import React, { useEffect, useState } from "react";
import { IVideo } from "../components/VideoTile";
import { useLocation } from "react-router-dom";

interface IVideoLoaderTypes {
  children: React.ReactNode;
  serverURL: string;
}

const VideoLoader = ({ children, serverURL }: IVideoLoaderTypes) => {
  const location = useLocation();
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
  }, [serverURL, location]);
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              videos,
              introduction,
              serverURL,
              isHidden: !location.pathname.includes("/videoList"),
            })
          : null
      )}
    </>
  );
};

export default VideoLoader;
