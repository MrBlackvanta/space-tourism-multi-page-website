import { runViewTransition } from "@/lib";
import { type KeyboardEvent, useId, useState } from "react";
import { flushSync } from "react-dom";
import { useSwipe } from "./use-swipe";

type Orientation = "horizontal" | "vertical";
type KeyTarget = (current: number, last: number) => number;

const toPrevious: KeyTarget = (current, last) =>
  current === 0 ? last : current - 1;
const toNext: KeyTarget = (current, last) =>
  current === last ? 0 : current + 1;
const toFirst: KeyTarget = () => 0;
const toLast: KeyTarget = (_, last) => last;

const keyTargets: Record<Orientation, Record<string, KeyTarget>> = {
  horizontal: {
    ArrowLeft: toPrevious,
    ArrowRight: toNext,
    Home: toFirst,
    End: toLast,
  },
  vertical: {
    ArrowUp: toPrevious,
    ArrowDown: toNext,
    Home: toFirst,
    End: toLast,
  },
};

export function useTabs(
  count: number,
  orientation: Orientation = "horizontal",
) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabId = (index: number) => `${id}tab-${index}`;
  const panelId = `${id}panel`;

  function select(next: number) {
    if (next === selected) return;

    runViewTransition("tab", next > selected ? "forward" : "back", () => {
      flushSync(() => setSelected(next));
    });
  }

  const swipeProps = useSwipe({
    onSwipeLeft: () => select(Math.min(selected + 1, count - 1)),
    onSwipeRight: () => select(Math.max(selected - 1, 0)),
  });

  function onKeyDown(event: KeyboardEvent) {
    const target = keyTargets[orientation][event.key];
    if (!target) return;

    event.preventDefault();
    const next = target(selected, count - 1);
    select(next);
    document.getElementById(tabId(next))?.focus();
  }

  return {
    selected,
    swipeProps,
    tabListProps: {
      role: "tablist",
      "aria-orientation": orientation,
      onKeyDown,
    },
    tabProps: (index: number) => ({
      id: tabId(index),
      role: "tab",
      "aria-selected": index === selected,
      "aria-controls": panelId,
      tabIndex: index === selected ? 0 : -1,
      onClick: () => select(index),
    }),
    panelProps: {
      id: panelId,
      role: "tabpanel",
      "aria-labelledby": tabId(selected),
      tabIndex: 0,
    },
  };
}
