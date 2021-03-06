import styles from "./VideoTile.module.css";
import classNames from "classnames";
import { useRef, useEffect, ReactEventHandler, useState } from "react";
import { useIntersection } from "../customHooks";

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
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isVisible = useIntersection(videoContainerRef, "200px");
  console.log("isVideoTileVisible", videoFilename, isVisible);
  useEffect(() => {
    if (videoRef.current && isHidden) {
      videoRef.current.pause();
    }
  }, [isHidden]);

  const handleClick = (
    _event:
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

  console.log("videoWidth and Height", videoFilename, videoWidth, videoHeight);

  return (
    <div
      className={classNames(styles.videoTile, { [styles.hidden]: isHidden })}
    >
      <div className={styles.videoContent} ref={videoContainerRef}>
        {isVisible ? (
          <div className={styles.videoWrapper}>
            {!isPlaying && (
              <div
                className={styles.videoContentControls}
                style={{
                  height: videoHeight,
                  width: videoWidth,
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
          </div>
        ) : null}
        <div className={styles.videoTextContent}>
          <h2>{title.toUpperCase()}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
