export type TransitionKind = "route" | "tab";
export type TransitionDirection = "forward" | "back";

let current: ViewTransition | null = null;

export function canAnimateViews() {
  return (
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function runViewTransition(
  kind: TransitionKind,
  direction: TransitionDirection,
  update: () => void | Promise<void>,
) {
  if (!canAnimateViews()) {
    void update();
    return;
  }

  const root = document.documentElement;
  root.dataset.transition = kind;
  root.dataset.direction = direction;

  const transition = document.startViewTransition(update);
  current = transition;

  function settle() {
    if (current !== transition) return;

    current = null;
    delete root.dataset.transition;
    delete root.dataset.direction;
  }

  transition.ready.catch(() => {});
  transition.finished.then(settle, settle);
}
