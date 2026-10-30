import { fireEvent } from "@testing-library/react";

export function swipe(element: Element, dx: number, dy = 0) {
  fireEvent.touchStart(element, { touches: [{ clientX: 200, clientY: 200 }] });
  fireEvent.touchEnd(element, {
    changedTouches: [{ clientX: 200 + dx, clientY: 200 + dy }],
  });
}
