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
  onClick?: (video: HTMLVideoElement | null) => void;
  isHidden: boolean;
}

const VideoTile = ({
  title,
  description,
  videoFilename,
  serverURL,
  onVideoStopped,
  onClick,
  onVideoStarted,
  isHidden,
}: IVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && isHidden) {
      videoRef.current.pause();
    }
  }, [isHidden]);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLVideoElement>
      | React.TouchEvent<HTMLVideoElement>
  ) => {
    event.preventDefault();
    if (onClick) {
      onClick(videoRef.current);
    }
  };

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
          onClick={handleClick}
          onTouchStart={handleClick}
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
