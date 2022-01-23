import topBanner from "./images/10.5-1A-Pull-TopBanner.png";
import centerVideo from "./images/10.5-1B-Pull-CenterVideo-FPO.png";
import bottomBanner from "./images/10.5-1C-Pull-BottomBanner.png";
import styles from "./PullScreen.module.css";
import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classnames from "classnames";

const PullScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(() => {
    if (location.pathname === "/") {
      navigate("/videoList");
      console.log("screen clicked");
    }
  }, [navigate, location]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div
      className={classnames({
        [styles.pullScreen]: true,
        [styles.hidden]: location.pathname !== "/",
      })}
    >
      <img src={topBanner} alt="Decorative Banner" />
      <img src={centerVideo} alt="Voices of Mont Belview" />
      <img src={bottomBanner} alt="Decorative Banner" />
    </div>
  );
};

export default PullScreen;
