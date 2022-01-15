import styles from "./VideoList.module.css";
import topBanner from "./images/2a-Play-TopBanner.png";
import VideoTile, { IVideo } from "./VideoTile";
import { useTimeout } from "../customHooks";
import { useNavigate } from "react-router";
export interface IVideoListProps {
  videos?: IVideo[];
}

// TODO: check with angela on maximum video length before pull screen, do I have to deduce this somehow?
const PULLSCREEN_RETURN_TIMEOUT = 60 * 15 * 1000;
// const PULLSCREEN_RETURN_TIMEOUT = 5 * 1000;

const VideoList = ({ videos }: IVideoListProps) => {
  const navigate = useNavigate();
  useTimeout(() => {
    navigate("/");
  }, PULLSCREEN_RETURN_TIMEOUT);
  return (
    <div className={styles.videoPage}>
      <header className={styles.header}>
        <img src={topBanner} />
      </header>
      <div className={styles.videoList}>
        {Array.isArray(videos)
          ? videos.map((video) => <VideoTile {...video} />)
          : null}
      </div>
    </div>
  );
};

export default VideoList;
