import topBanner from "./images/1a-Pull-TopBanner.png";
import centerVideo from "./images/1b-Pull-CenterVideo-FPO.png";
import bottomBanner from "./images/1c-Pull-BottomBanner.png";
import styles from "./PullScreen.module.css";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PullScreen = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/videoList");
    console.log("screen clicked");
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className={styles.pullScreen}>
      <img src={topBanner} />
      <img src={centerVideo} />
      <img src={bottomBanner} />
    </div>
  );
};

export default PullScreen;
