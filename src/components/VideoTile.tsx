import styles from "./VideoTile.module.css";

export interface IVideo {
  title: string;
  description: string;
  videoFilename: string;
  keywords: string;
}

const VideoTile = ({ title, description, videoFilename }: IVideo) => {
  return (
    <div className={styles.videoTile}>
      <div className={styles.videoContent}>
        <video controls>
          <source src={`http://127.0.0.1:3000/api/${videoFilename}`}></source>
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
