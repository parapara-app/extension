import { Tooltip } from "@/components/Tooltip";
import { calculateTooltipPosition, getSelectionBoundingRects } from "@/lib/caculateTooltipPosition";
import React from "react";
import { createRoot } from "react-dom/client";

export const showTooltip = (
  word: string,
  meanings: string[],
  position: { x: number; y: number }
) => {
  removeExistingTooltip();

  const container = document.createElement("div");
  container.id = "para-tooltip-root";
  container.style.position = "absolute";
  container.style.top = `${position.y}px`;
  container.style.left = `${position.x}px`;
  container.style.zIndex = "999999";
  container.style.visibility = "hidden";

  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(React.createElement(Tooltip, { word, meanings }));

  requestAnimationFrame(() => {
    const tooltipRect = container.getBoundingClientRect();
    const { width, height } = tooltipRect;

    const rects = getSelectionBoundingRects();
    const pos = calculateTooltipPosition(rects, width, height);

    container.style.left = `${pos.left}px`;
    container.style.top = `${pos.top}px`;
    container.style.visibility = "visible";
  });

  const handleOutsideClick = createOutsideClickHandler(container);
  setTimeout(() => {
    document.addEventListener("click", handleOutsideClick);
  }, 0);
};

const removeExistingTooltip = () => {
  const existing = document.getElementById("para-tooltip-root");
  if (existing) {
    existing.remove();
  }
};

const createOutsideClickHandler = (container: HTMLElement) => {
  const handleOutsideClick = (event: MouseEvent) => {
    if (!container.contains(event.target as Node)) {
      removeExistingTooltip();
      document.removeEventListener("click", handleOutsideClick);
    }
  };
  return handleOutsideClick;
};
