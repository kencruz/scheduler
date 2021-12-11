import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      if (history.length > 1) {
        const newHistory = history.slice(0, history.length - 1);
        setHistory([...newHistory, newMode]);
        setMode(newMode);
      }
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(() => newHistory);
      setMode(() => newHistory[newHistory.length - 1]);
    }
  }
  return { transition, mode, back };
}
