import styles from "./VideoKeywordsSelector.module.css";

export const ALL_TOPICS = "All topics";
interface IVideoKeywordsSelectorProps {
  keywords: string[];
  onChange: (option: string) => void;
}

const VideoKeywordsSelector = ({
  keywords,
  onChange,
}: IVideoKeywordsSelectorProps) => {
  return (
    <div className={styles.videoKeywordsSelector}>
      <label id="filter">Filter by topic: </label>
      <select
        aria-labelledby="filter"
        onChange={(event) =>
          onChange(event.target.value === ALL_TOPICS ? "" : event.target.value)
        }
      >
        <option>{ALL_TOPICS}</option>
        {keywords.sort().map((keyword) => (
          <option key={keyword}>{keyword}</option>
        ))}
      </select>
    </div>
  );
};

export default VideoKeywordsSelector;
