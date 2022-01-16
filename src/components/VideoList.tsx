import styles from "./VideoList.module.css";
import topBanner from "./images/2a-Play-TopBanner.png";
import VideoTile, { IVideo } from "./VideoTile";
import { useTimeout } from "../customHooks";
import { useNavigate } from "react-router";
import VideoKeywordsSelector from "./VideoKeywordsSelector";
import { flatten, uniq, isEmpty } from "lodash";
import { useState } from "react";
export interface IVideoListProps {
  videos?: IVideo[];
  introduction?: string;
  serverURL?: string;
}

// TODO: check with angela on maximum video length before pull screen, do I have to deduce this somehow?
const PULLSCREEN_RETURN_TIMEOUT = 60 * 15 * 1000;
// const PULLSCREEN_RETURN_TIMEOUT = 5 * 1000;

const VideoList = ({ videos, introduction, serverURL }: IVideoListProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  useTimeout(() => {
    navigate("/");
  }, PULLSCREEN_RETURN_TIMEOUT);
  return (
    <div className={styles.videoPage}>
      <header className={styles.header}>
        <img src={topBanner} alt="Video List" />
        {introduction ? (
          <p className={styles.description}>{introduction}</p>
        ) : null}
      </header>

      <div className={styles.videoList}>
        {isEmpty(videos) ? (
          <h2 className={styles.noVideos}>No videos can be found</h2>
        ) : (
          <>
            <VideoKeywordsSelector
              keywords={
                Array.isArray(videos)
                  ? uniq(
                      flatten(videos.map(({ keywords }) => keywords.split(",")))
                    )
                  : []
              }
              onChange={(selectedKeyword) => setKeyword(selectedKeyword)}
            />
            {Array.isArray(videos) && serverURL
              ? videos
                  .filter(
                    ({ keywords }) =>
                      // first allow all videos if no keyword is set
                      keyword === "" ||
                      // otherwise look for the specific keyword
                      keywords.split(",").includes(keyword)
                  )
                  .map((video) => (
                    <VideoTile
                      key={video.videoFilename}
                      {...video}
                      serverURL={serverURL}
                    />
                  ))
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoList;
