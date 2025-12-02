import PropTypes from "prop-types";
import { Timer, RotateCcw, Search } from "lucide-react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import styles from "./Header.module.css";

function Header({ minutes, seconds, onRestart }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <Search className={styles.titleIcon} />
        <h1 className={styles.title}>WORD SEARCH</h1>
      </div>
      <div className={styles.controls}>
        <div className={styles.timerWrapper}>
          <Timer className={styles.timerIcon} />
          <NumberFlowGroup>
            <div
              style={{
                fontVariantNumeric: "tabular-nums",
                "--number-flow-char-height": "0.85em",
              }}
              className={styles.timerDisplay}
            >
              <NumberFlow
                value={minutes}
                format={{ minimumIntegerDigits: 2 }}
              />
              <NumberFlow
                prefix=":"
                value={seconds}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
              />
            </div>
          </NumberFlowGroup>
        </div>
        <button
          onClick={onRestart}
          className={styles.restartButton}
          title="Restart Game"
        >
          <RotateCcw className={styles.restartIcon} />
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Header;
