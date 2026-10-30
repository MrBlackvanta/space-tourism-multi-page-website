import { fireEvent } from "@testing-library/react";

type Point = { x: number; y: number };

function centerOf(element: Element): Point {
  const { x, y, width, height } = element.getBoundingClientRect();
  return { x: x + width / 2, y: y + height / 2 };
}

export function swipe(
  element: Element,
  dx: number,
  dy = 0,
  from = centerOf(element),
) {
  fireEvent.touchStart(element, {
    touches: [{ clientX: from.x, clientY: from.y }],
  });
  fireEvent.touchEnd(element, {
    changedTouches: [{ clientX: from.x + dx, clientY: from.y + dy }],
  });
}
