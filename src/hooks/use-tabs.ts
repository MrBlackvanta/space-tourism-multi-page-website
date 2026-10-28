import { type KeyboardEvent, useId, useState } from "react";

const keyTargets: Record<string, (current: number, last: number) => number> = {
  ArrowLeft: (current, last) => (current === 0 ? last : current - 1),
  ArrowRight: (current, last) => (current === last ? 0 : current + 1),
  Home: () => 0,
  End: (_, last) => last,
};

export function useTabs(count: number) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabId = (index: number) => `${id}tab-${index}`;
  const panelId = `${id}panel`;

  function onKeyDown(event: KeyboardEvent) {
    const target = keyTargets[event.key];
    if (!target) return;

    event.preventDefault();
    const next = target(selected, count - 1);
    setSelected(next);
    document.getElementById(tabId(next))?.focus();
  }

  return {
    selected,
    tabListProps: { role: "tablist", onKeyDown },
    tabProps: (index: number) => ({
      id: tabId(index),
      role: "tab",
      "aria-selected": index === selected,
      "aria-controls": panelId,
      tabIndex: index === selected ? 0 : -1,
      onClick: () => setSelected(index),
    }),
    panelProps: {
      id: panelId,
      role: "tabpanel",
      "aria-labelledby": tabId(selected),
      tabIndex: 0,
    },
  };
}
