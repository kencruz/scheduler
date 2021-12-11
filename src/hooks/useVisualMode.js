import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      back();
    }
    setHistory((prev) => {
      setMode(() => newMode);
      return [...prev, newMode];
    });
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, prev.length - 1);
        setMode(() => newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  }
  return { transition, mode, back };
}
