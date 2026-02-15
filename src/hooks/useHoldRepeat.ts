import { useCallback, useEffect, useRef } from 'react';

export function useHoldRepeat(callback: () => void, delay = 400, interval = 80) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = null;
    intervalRef.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(callback, interval);
    }, delay);
  }, [callback, delay, interval, stop]);

  useEffect(() => stop, [stop]);

  return { onPointerDown: start, onPointerUp: stop, onPointerLeave: stop };
}
