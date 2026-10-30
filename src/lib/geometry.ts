export type Point = { x: number; y: number };

export function covers(element: Element | null, { x, y }: Point) {
  if (!element) return false;

  const { left, right, top, bottom } = element.getBoundingClientRect();
  return x >= left && x <= right && y >= top && y <= bottom;
}
