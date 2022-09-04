import styles from "./VideoList.module.css";
import topBanner from "./images/10.5-2A-Play-TopBanner.png";
import VideoTile, { IVideo } from "./VideoTile";
import { useTimeout } from "../customHooks";
import { useLocation, useNavigate } from "react-router";
import VideoKeywordsSelector from "./VideoKeywordsSelector";
import { flatten, uniq, isEmpty } from "lodash";
import {
  useState,
  useCallback,
  useEffect,
  UIEventHandler,
  useRef,
} from "react";
import classnames from "classnames";
import { useOnScrollListener } from "@scottdickerson/barbers-hill-shared-components";

export interface IVideoListProps {
  videos?: IVideo[];
  introduction?: string;
  serverURL?: string;
}

const pauseVideos = (videos: HTMLVideoElement[]) => {
  videos.forEach((video) => {
    if (!(video.ended || video.paused) && video.id !== "pullscreenvideo") {
      console.log("pausing video", video.src);
      video.pause();
    }
  });
};

// Two minutes after the last video stops playing
const PULLSCREEN_RETURN_TIMEOUT = 60 * 2 * 1000;
// const PULLSCREEN_RETURN_TIMEOUT = 5 * 1000;
const SCROLL_CHECK_TIMEOUT = 100;

const VideoList = ({ videos, introduction, serverURL }: IVideoListProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const videoScrollRef = useRef<HTMLDivElement>(null);
  // will turn off timeout while video is playing and turn it back on afterwards
  const [timeout, setTimeout] = useState<number | null>(
    PULLSCREEN_RETURN_TIMEOUT
  );

  const clearTimeout = useCallback(() => {
    console.log("suspend timer");
    setTimeout(null);
  }, []);
  const restartTimeout = useCallback(() => {
    console.log("restart timer to ", PULLSCREEN_RETURN_TIMEOUT);
    setTimeout(PULLSCREEN_RETURN_TIMEOUT);
  }, []);

  const { isScrolling, handleScroll } = useOnScrollListener({
    scrollCheckTimeout: SCROLL_CHECK_TIMEOUT,
    onScrollFinished: restartTimeout,
    onScrollStarted: clearTimeout,
  });

  const handleVideoStarted = useCallback(
    (event) => {
      clearTimeout();
      // stop all the other videos
      const videoStarting = event?.currentTarget?.src;
      console.log("stopping all videos but", videoStarting);
      pauseVideos(
        Array.from(document.getElementsByTagName("video")).filter(
          (video: HTMLVideoElement) => video.src !== videoStarting
        )
      );
    },
    [clearTimeout]
  );

  const handleVideoStopped = () => {
    restartTimeout();
  };

  const handleVideoClick = (video: HTMLVideoElement | null) => {
    if (video) {
      console.log("handle video click", video.paused);
      if (video.paused && !isScrolling) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // once I start scrolling pause any running videos
  useEffect(() => {
    if (isScrolling) {
      pauseVideos(Array.from(document.getElementsByTagName("video")));
    } else {
    }
  }, [isScrolling]);

  //
  useTimeout(() => {
    console.log("timer reached returning to previous page");
    clearTimeout();
    if (videoScrollRef.current) {
      console.log("current scrollTop", videoScrollRef.current.scrollTop);
      videoScrollRef.current.scrollTop = 0;
    }
    navigate("/");
  }, timeout);

  const { pathname } = useLocation();

  // HACK! We have to secretly hide the video list around for file caching so clear the keyword state if we leave
  useEffect(() => {
    if (pathname === "/") {
      setKeyword("");
    } else {
      // start the timeout when we render again
      restartTimeout();
    }
  }, [pathname]);

  return (
    <div
      className={classnames(styles.videoPage, {
        [styles.hidden]: pathname === "/",
      })}
    >
      <header className={styles.header}>
        <img src={topBanner} alt="Video List" />
        {introduction ? (
          <p className={styles.description}>{introduction}</p>
        ) : null}
      </header>

      <div
        className={styles.videoList}
        onScroll={handleScroll as unknown as UIEventHandler<HTMLDivElement>}
        ref={videoScrollRef}
      >
        <p className={styles.mediaLibrary}>Media Library</p>
        {isEmpty(videos) ? (
          <h2 className={styles.noVideos}>No videos can be found</h2>
        ) : (
          <>
            <VideoKeywordsSelector
              key={pathname} // throw away if the path changes
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
              ? videos.map((video) => (
                  <VideoTile
                    key={video.videoFilename}
                    {...video}
                    onClick={!isScrolling ? handleVideoClick : undefined}
                    isHidden={
                      pathname === "/" || // this will stop the video from continuing to play when we leave
                      (keyword !== "" &&
                        // otherwise look for the specific keyword
                        !video.keywords
                          .split(",")
                          .map((keywordString) => keywordString.trim())
                          .includes(keyword))
                    }
                    serverURL={serverURL}
                    onVideoStarted={handleVideoStarted}
                    onVideoStopped={handleVideoStopped}
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
