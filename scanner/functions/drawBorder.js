function drawBorder(context, rect, color) {
  const {
    height,
    left,
    top,
    width
  } = rect; // outline

  context.lineWidth = 1;
  context.strokeStyle = OUTLINE_COLOR;
  context.strokeRect(left - 1, top - 1, width + 2, height + 2); // inset

  context.lineWidth = 1;
  context.strokeStyle = OUTLINE_COLOR;
  context.strokeRect(left + 1, top + 1, width - 1, height - 1);
  context.strokeStyle = color;
  context.setLineDash([0]); // border

  context.lineWidth = 1;
  context.strokeRect(left, top, width - 1, height - 1);
  context.setLineDash([0]);
}