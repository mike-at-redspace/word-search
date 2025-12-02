import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "./InstallPrompt.module.css";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const shouldShow = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return false;
      }
      const isDesktop = window.matchMedia("(min-width: 641px)").matches;
      if (
        isDesktop &&
        sessionStorage.getItem("installPromptDismissed") === "true"
      ) {
        return false;
      }
      return true;
    };

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (shouldShow()) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem("installPromptDismissed", "true");
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className={styles.installPrompt}>
      <div className={styles.content}>
        <div className={styles.text}>
          <strong>Install Word Search</strong>
          <span>Add to your home screen for a better experience!</span>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.installButton}
            onClick={handleInstallClick}
            aria-label="Install app"
          >
            <Download className={styles.installIcon} />
            Install
          </button>
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
