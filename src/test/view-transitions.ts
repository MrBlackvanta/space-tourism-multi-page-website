import { vi } from "vite-plus/test";

export type StartedTransition = {
  dataset: Record<string, string | undefined>;
  finish: () => void;
};

export function stubViewTransitions({ runUpdate = true } = {}) {
  const started: StartedTransition[] = [];
  const updates: (() => unknown)[] = [];

  const start = vi.fn((update: () => unknown) => {
    let finish = () => {};
    const finished = new Promise<void>((resolve) => {
      finish = resolve;
    });
    started.push({ dataset: rootDataset(), finish });
    updates.push(update);
    if (runUpdate) void update();
    return { ready: Promise.resolve(), finished };
  });

  Object.defineProperty(document, "startViewTransition", {
    value: start,
    configurable: true,
  });

  return { start, started, updates };
}

export function removeViewTransitions() {
  Reflect.deleteProperty(document, "startViewTransition");
}

export function rootDataset() {
  return Object.fromEntries(Object.entries(document.documentElement.dataset));
}
