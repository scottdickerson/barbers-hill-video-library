import styles from "./VideoTile.module.css";

export interface IVideo {
  title: string;
  description: string;
  videoFilename: string;
  keywords: string;

  serverURL: string;
  onVideoStopped: () => void;
  onVideoStarted: () => void;
}

const VideoTile = ({
  title,
  description,
  videoFilename,
  serverURL,
  onVideoStopped,
  onVideoStarted,
}: IVideo) => {
  return (
    <div className={styles.videoTile}>
      <div className={styles.videoContent}>
        <video
          controls
          onPlay={onVideoStarted}
          onEnded={onVideoStopped}
          onPause={onVideoStopped}
        >
          <source src={`${serverURL}/api/${videoFilename}`}></source>
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
