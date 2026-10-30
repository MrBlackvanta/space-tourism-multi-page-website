import { covers, type Point } from "@/lib";
import { useEffect, useEffectEvent, useRef } from "react";

type SwipeHandlers = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const minDistance = 50;

function pointOf({ clientX, clientY }: Touch): Point {
  return { x: clientX, y: clientY };
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const area = useRef<HTMLDivElement>(null);
  const onSwipe = useEffectEvent((dx: number) =>
    (dx < 0 ? onSwipeLeft : onSwipeRight)(),
  );

  useEffect(() => {
    let origin: Point | null = null;

    function onTouchStart({ touches }: TouchEvent) {
      const start = touches.length === 1 ? pointOf(touches[0]) : null;
      origin = start && covers(area.current, start) ? start : null;
    }

    function onTouchEnd({ changedTouches }: TouchEvent) {
      const start = origin;
      origin = null;
      if (!start) return;

      const end = pointOf(changedTouches[0]);
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      if (Math.abs(dx) < minDistance || Math.abs(dx) <= Math.abs(dy)) return;

      onSwipe(dx);
    }

    function forget() {
      origin = null;
    }

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
    document.addEventListener("touchcancel", forget);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", forget);
    };
  }, []);

  return { ref: area };
}
