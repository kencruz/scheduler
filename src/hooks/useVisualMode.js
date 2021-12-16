import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      back();
    }
    setHistory((prev) => {
      // important to setMode inside here so that the replace functionality
      // sets the state first
      setMode(() => newMode);
      return [...prev, newMode];
    });
  }

  function back() {
    // it will only go back if there is at least 2 items in history
    if (history.length > 1) {
      setHistory((prev) => {
        // take the previous history except the most recent item
        const newHistory = prev.slice(0, prev.length - 1);
        // the mode is now the most recent item of newHistory
        setMode(() => newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  }
  return { transition, mode, back };
}
