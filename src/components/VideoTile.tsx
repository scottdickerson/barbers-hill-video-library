import styles from "./VideoTile.module.css";
import classNames from "classnames";
import { useRef, useEffect, ReactEventHandler } from "react";

export interface IVideo {
  title: string;
  description: string;
  videoFilename: string;
  keywords: string;

  serverURL: string;
  onVideoStopped: ReactEventHandler<HTMLVideoElement>;
  onVideoStarted: ReactEventHandler<HTMLVideoElement>;
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
          src={`${serverURL}/${videoFilename}`}
        ></video>
        <div className={styles.videoTextContent}>
          <h2>{title.toUpperCase()}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
