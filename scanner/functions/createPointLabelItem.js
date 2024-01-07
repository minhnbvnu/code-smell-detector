function createPointLabelItem(scale, index, itemOpts) {
  const outerDistance = scale.drawingArea;
  const {extra, additionalAngle, padding, size} = itemOpts;
  const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
  const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
  const y = yForAngle(pointLabelPosition.y, size.h, angle);
  const textAlign = getTextAlignForAngle(angle);
  const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
  return {
    // if to draw or overlapped
    visible: true,

    // Text position
    x: pointLabelPosition.x,
    y,

    // Text rendering data
    textAlign,

    // Bounding box
    left,
    top: y,
    right: left + size.w,
    bottom: y + size.h
  };
}