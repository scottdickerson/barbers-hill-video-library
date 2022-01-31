import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVideos, fetchOverview } from "../videoReducer";

interface IVideoLoaderTypes {
  serverURL: string;
}

const VideoLoader = ({ serverURL }: IVideoLoaderTypes) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchVideos(serverURL));
    dispatch(fetchOverview(serverURL));
  }, [serverURL, location, dispatch]);
  return null;
};

export default VideoLoader;
