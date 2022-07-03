import styles from "./VideoTile.module.css";
import classNames from "classnames";
import { useRef, useEffect, ReactEventHandler, useState } from "react";

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
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (onClick) {
      onClick(videoRef.current);
    }
  };

  const handleVideoStarted: ReactEventHandler<HTMLVideoElement> = (event) => {
    setIsPlaying(true);
    onVideoStarted(event);
  };

  const handleVideoStopped: ReactEventHandler<HTMLVideoElement> = (event) => {
    setIsPlaying(false);
    onVideoStopped(event);
  };

  const { width: videoWidth, height: videoHeight } =
    videoRef.current?.getBoundingClientRect() || {};

  return (
    <div
      className={classNames(styles.videoTile, { [styles.hidden]: isHidden })}
    >
      <div className={styles.videoContent}>
        {!isPlaying && (
          <div
            className={styles.videoContentControls}
            style={{
              height: videoHeight,
              width: videoWidth,
              top: "2rem",
              left: "4rem",
            }}
          />
        )}
        <video
          ref={videoRef}
          onPlay={handleVideoStarted}
          onEnded={handleVideoStopped}
          onPause={handleVideoStopped}
          onClick={handleClick}
          onTouchStart={handleClick}
          onTouchEnd={(event) => {
            event?.preventDefault();
          }}
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
