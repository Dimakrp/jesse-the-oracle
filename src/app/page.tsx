"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

const PREDICTIONS = [
  "A small Base post will bring unexpected attention",
  "Your meme folder will finally be useful",
  "A reply will be funnier than the original post",
  "Jesse will say something simple that means a lot",
  "A small tool will matter",
  "Later...",
  "That will be the right move",
  "Someone will bookmark your post",
  "A tiny app will feel bigger than expected",
  "The answer will be yes",
  "A reply will turn into a DM",
  "Build first. Post later",
  "Keep baseposting",
  "Baseposting intern thought about you today",
  "It's better to start now",
  "You will poop today",
  "Today or never",
  "Your baseposting attracts Jesse's follow",
  "Forget circles, choose squares (blue squares)",
  "Post your drafts today",
];

const COOLDOWN_MS = 1000; // 1 second

type View = "idle" | "result";

export default function Home() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [username, setUsername] = useState("username");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [lastPredictionAt, setLastPredictionAt] = useState<number | null>(null);
  const [view, setView] = useState<View>("idle");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Global error handler to catch extension errors
    const handleError = (event: ErrorEvent) => {
      // Ignore errors from browser extensions
      if (
        (event.filename && event.filename.includes("chrome-extension://")) ||
        (event.message && event.message.includes("chrome-extension://")) ||
        (event.error && event.error.stack && event.error.stack.includes("chrome-extension://"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Ignore unhandled rejections from browser extensions
      if (
        event.reason &&
        (event.reason.toString().includes("chrome-extension://") ||
          (event.reason.stack && event.reason.stack.includes("chrome-extension://")))
      ) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    try {
      const stored = localStorage.getItem("jesse-last-prediction");
      if (stored) {
        const parsed = Number(stored);
        if (!Number.isNaN(parsed) && parsed > 0) {
          setLastPredictionAt(parsed);
        }
      }
    } catch (error) {
      console.warn("Failed to load prediction timestamp:", error);
    }

    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  const canPredict = useMemo(() => {
    if (!lastPredictionAt) return true;
    return now - lastPredictionAt >= COOLDOWN_MS;
  }, [lastPredictionAt, now]);

  const remainingMs = useMemo(() => {
    if (!lastPredictionAt) return 0;
    const elapsed = now - lastPredictionAt;
    return Math.max(COOLDOWN_MS - elapsed, 0);
  }, [lastPredictionAt, now]);

  const formattedUsername = useMemo(() => {
    const cleaned = username.trim().replace(/^@+/, "");
    return cleaned.length ? cleaned : "username";
  }, [username]);

  const handleReveal = () => {
    if (!canPredict) return;
    if (PREDICTIONS.length === 0) return;
    const randomIndex = Math.floor(Math.random() * PREDICTIONS.length);
    const choice = PREDICTIONS[randomIndex];
    if (!choice) return;
    const timestamp = Date.now();
    setPrediction(choice);
    setLastPredictionAt(timestamp);
    try {
      localStorage.setItem("jesse-last-prediction", String(timestamp));
    } catch (error) {
      console.warn("Failed to save prediction timestamp:", error);
    }
    setView("result");
  };

  const handleBack = () => {
    setView("idle");
  };

  const handleSave = async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#faf5ef",
        includeQueryParams: false,
      });
      if (!dataUrl) return;
      const link = document.createElement("a");
      if (!link) return;
      link.download = `jesse-fate-${formattedUsername || "user"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  };

  const formatCountdown = (ms: number) => {
    if (!ms || ms < 0 || !Number.isFinite(ms)) return "00:00:00";
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.card} ref={cardRef}>
        <header className={styles.header}>
          <div className={styles.profile}>
            <div className={styles.avatar} aria-hidden />
            <div className={styles.username}>
              <span>@</span>
              <input
                aria-label="Username"
                value={formattedUsername}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
        </header>

        <main className={styles.content}>
          {view === "idle" ? (
            <>
              <div className={styles.oracleArt} aria-hidden>
                <div className={styles.speechBubble}>
                  {canPredict
                    ? "Welcome! Tap the button to reveal your fate."
                    : "Come back later"}
                </div>
                {!canPredict && (
                  <div className={styles.timerContainer}>
                    <span className={styles.timerLabel}>The next fate will be in </span>
                    <span className={styles.timerValue}>{formatCountdown(remainingMs)}</span>
                  </div>
                )}
                <img
                  src="/pers.png"
                  alt="Jesse pixel portrait"
                  className={styles.character}
                />
                <button
                  className={styles.cta}
                  type="button"
                  onClick={handleReveal}
                  disabled={!canPredict}
                >
                  <span className={styles.buttonText}>Button</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.resultHeader}>
                <p className={styles.resultTitle}>
                  Fate for @{formattedUsername}:
                </p>
                {prediction && (
                  <p className={styles.predictionText}>{prediction}</p>
                )}
              </div>

              <div className={styles.resultContainer}></div>
            </>
          )}
        </main>
        {view === "result" && (
          <img
            src="/derz.png"
            alt="Hands"
            className={styles.derzImage}
          />
        )}

        {view === "result" && (
          <div className={styles.bottomActions}>
            <button className={styles.back} type="button" onClick={handleBack}>
              Back
            </button>
            <button
              className={styles.saveFate}
              type="button"
              onClick={handleSave}
              aria-label="Save prediction as image"
            >
              Save the fate
            </button>
          </div>
        )}
        </div>
    </div>
  );
}
