import styles from "./Background.module.css";

function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.bgGradientTop} />
      <div className={styles.bgGradientBottom} />
    </div>
  );
}

export default Background;
