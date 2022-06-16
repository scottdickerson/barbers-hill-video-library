import centerVideo from "./video/voicesMtBelvieu_pullScreen_MP4.mp4";
import styles from "./PullScreen.module.css";
import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classnames from "classnames";

const PullScreen = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (window.location.pathname === "/") {
      navigate("/videoList");
      console.log("screen clicked");
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, [handleClick]);

  const { pathname } = useLocation();

  return (
    <div
      className={classnames(styles.pullScreen, {
        [styles.hidden]: pathname !== "/",
      })}
    >
      <video src={centerVideo} autoPlay muted loop />
    </div>
  );
};

export default PullScreen;
