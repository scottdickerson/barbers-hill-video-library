import styles from "./VideoTile.module.css";
import classNames from "classnames";
import { useRef, useEffect } from "react";

export interface IVideo {
  title: string;
  description: string;
  videoFilename: string;
  keywords: string;

  serverURL: string;
  onVideoStopped: () => void;
  onVideoStarted: () => void;
  isHidden: boolean;
}

const VideoTile = ({
  title,
  description,
  videoFilename,
  serverURL,
  onVideoStopped,
  onVideoStarted,
  isHidden,
}: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && isHidden) {
      videoRef.current.pause();
    }
  }, [isHidden]);

  return (
    <div
      className={classNames(styles.videoTile, { [styles.hidden]: isHidden })}
    >
      <div className={styles.videoContent}>
        <video
          controls
          ref={videoRef}
          onPlay={onVideoStarted}
          onEnded={onVideoStopped}
          onPause={onVideoStopped}
        >
          <source src={`${serverURL}/${videoFilename}`}></source>
        </video>
        <div className={styles.videoTextContent}>
          <h2>{title.toUpperCase()}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
