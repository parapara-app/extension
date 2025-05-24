export const calculateTooltipPosition = (
  rects: ReturnType<typeof getSelectionBoundingRects>,
  tooltipWidth: number,
  tooltipHeight: number
) => {
  if (!rects) return { top: 0, left: 0 };

  const { innerWidth, innerHeight } = window;

  const positions = [
    // Top Right
    {
      top: rects.topRight.y - tooltipHeight,
      left: rects.topRight.x,
    },
    // Bottom Right
    {
      top: rects.bottomRight.y,
      left: rects.bottomRight.x,
    },
    // Bottom Left
    {
      top: rects.bottomLeft.y,
      left: rects.bottomLeft.x - tooltipWidth,
    },
    // Top Left
    {
      top: rects.topLeft.y - tooltipHeight,
      left: rects.topLeft.x - tooltipWidth,
    },
  ];

  return (
    positions.find(
      ({ top, left }) =>
        top + tooltipHeight <= innerHeight &&
        top >= 0 &&
        left + tooltipWidth <= innerWidth &&
        left >= 0
    ) || positions[0]
  );
};

export const getSelectionBoundingRects = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return {
    topRight: { x: rect.right, y: rect.top },
    bottomRight: { x: rect.right, y: rect.bottom },
    bottomLeft: { x: rect.left, y: rect.bottom },
    topLeft: { x: rect.left, y: rect.top },
  };
};
