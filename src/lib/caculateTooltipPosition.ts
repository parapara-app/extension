export const calculateTooltipPosition = (
  x: number,
  y: number,
  tooltipWidth: number,
  tooltipHeight: number
) => {
  const { innerWidth, innerHeight } = window;

  const positions = [
    { top: y, left: x }, // 우상단
    { top: y + 24, left: x }, // 우하단
    { top: y + 24, left: x - tooltipWidth }, // 좌하단
    { top: y, left: x - tooltipWidth }, // 좌상단
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
