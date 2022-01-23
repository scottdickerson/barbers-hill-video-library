import styles from "./VideoList.module.css";
import topBanner from "./images/10.5-2A-Play-TopBanner.png";
import VideoTile, { IVideo } from "./VideoTile";
import { useTimeout } from "../customHooks";
import { useNavigate } from "react-router";
import VideoKeywordsSelector from "./VideoKeywordsSelector";
import { flatten, uniq, isEmpty } from "lodash";
import { useState, useCallback } from "react";
import classnames from "classnames";

export interface IVideoListProps {
  videos?: IVideo[];
  introduction?: string;
  serverURL?: string;

  isHidden?: boolean;
}

// Two minutes after the last video stops playing
const PULLSCREEN_RETURN_TIMEOUT = 60 * 2 * 1000;
// const PULLSCREEN_RETURN_TIMEOUT = 10 * 1000;

const VideoList = ({
  videos,
  introduction,
  serverURL,
  isHidden,
}: IVideoListProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  // will turn off timeout while video is playing and turn it back on afterwards
  const [timeout, setTimeout] = useState<number | null>(
    PULLSCREEN_RETURN_TIMEOUT
  );

  const clearTimeout = useCallback(() => {
    setTimeout(null);
  }, []);
  const restartTimeout = useCallback(() => {
    setTimeout(PULLSCREEN_RETURN_TIMEOUT);
  }, []);
  //
  useTimeout(() => {
    navigate("/");
  }, timeout);
  return (
    <div
      className={classnames({
        [styles.videoPage]: true,
        [styles.hidden]: isHidden,
      })}
    >
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
                      keywords
                        .split(",")
                        .map((keywordString) => keywordString.trim())
                        .includes(keyword)
                  )
                  .map((video) => (
                    <VideoTile
                      key={video.videoFilename}
                      {...video}
                      serverURL={serverURL}
                      onVideoStarted={clearTimeout}
                      onVideoStopped={restartTimeout}
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
