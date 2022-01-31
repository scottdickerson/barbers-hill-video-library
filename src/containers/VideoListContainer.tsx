import { useSelector } from "react-redux";
import React from "react";
import { IVideosState } from "../videoReducer";

interface IVideoListContainerProps {
  children: React.ReactNode;
  serverURL: string;
}

const VideoListContainer = ({
  children,
  serverURL,
}: IVideoListContainerProps) => {
  const videos = useSelector((state: IVideosState) => state?.videos?.data);
  const introduction = useSelector(
    (state: IVideosState) => state?.overview.data?.introduction
  );

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

export default VideoListContainer;
