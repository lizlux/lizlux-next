import { DifficultyLevel } from "../types/sudoku-types";
import styles from "./DifficultyToggle.module.css";

const DifficultyToggle = ({
  difficultyLevel,
  setDifficultyLevel,
}: {
  difficultyLevel: DifficultyLevel;
  setDifficultyLevel: (level: DifficultyLevel) => void;
}) => {
  return (
    <div className={styles.difficultyToggle}>
      <button
        className={
          styles.toggleButton + (difficultyLevel === 1 ? " selected" : "")
        }
        onClick={() => setDifficultyLevel(1)}
      >
        Easy
      </button>
      <button
        className={
          styles.toggleButton + (difficultyLevel === 2 ? " selected" : "")
        }
        onClick={() => setDifficultyLevel(2)}
      >
        Medium
      </button>
      <button
        className={
          styles.toggleButton + (difficultyLevel === 3 ? " selected" : "")
        }
        onClick={() => setDifficultyLevel(3)}
      >
        Hard
      </button>
    </div>
  );
};

export default DifficultyToggle;
