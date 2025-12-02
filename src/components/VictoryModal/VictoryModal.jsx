import PropTypes from "prop-types";
import { Trophy, RotateCcw, ArrowRight } from "lucide-react";
import styles from "./VictoryModal.module.css";

const VictoryModal = ({
  time,
  onRestart,
  onNextLevel,
  nextLevelTheme,
  currentTheme,
}) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <div className={styles.iconWrapper}>
        <Trophy className={styles.icon} />
      </div>

      <h2 className={styles.title}>LEVEL CLEAR!</h2>

      <p className={styles.subtitle}>You found all words in</p>

      <div className={styles.time}>{time}</div>

      <button
        onClick={onRestart}
        className={styles.button}
        style={
          currentTheme
            ? {
                background:
                  currentTheme["--color-bg-main-gradient"] ||
                  currentTheme["--color-bg-main"],
              }
            : {}
        }
      >
        <RotateCcw className={styles.icon} />
        Play Again
      </button>

      <button
        onClick={onNextLevel}
        className={styles.nextLevelButton}
        style={
          nextLevelTheme
            ? {
                background:
                  nextLevelTheme["--color-bg-main-gradient"] ||
                  nextLevelTheme["--color-bg-main"],
              }
            : {}
        }
      >
        <ArrowRight className={styles.icon} />
        Next Level
      </button>
    </div>
  </div>
);

VictoryModal.propTypes = {
  time: PropTypes.string.isRequired,
  onRestart: PropTypes.func.isRequired,
  onNextLevel: PropTypes.func.isRequired,
  nextLevelTheme: PropTypes.object,
  currentTheme: PropTypes.object,
};

export default VictoryModal;
