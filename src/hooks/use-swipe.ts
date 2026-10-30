import { type TouchEvent, useRef } from "react";

type Point = { x: number; y: number };

type SwipeHandlers = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const minDistance = 50;

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const origin = useRef<Point | null>(null);

  function forget() {
    origin.current = null;
  }

  function onTouchStart({ touches }: TouchEvent) {
    origin.current =
      touches.length === 1
        ? { x: touches[0].clientX, y: touches[0].clientY }
        : null;
  }

  function onTouchEnd({ changedTouches }: TouchEvent) {
    const start = origin.current;
    forget();
    if (!start) return;

    const dx = changedTouches[0].clientX - start.x;
    const dy = changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < minDistance || Math.abs(dx) <= Math.abs(dy)) return;

    (dx < 0 ? onSwipeLeft : onSwipeRight)();
  }

  return { onTouchStart, onTouchEnd, onTouchCancel: forget };
}
