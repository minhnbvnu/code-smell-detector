function positionsToPopperPlacement(position, arrowPosition) {
  let placement = position || POSITIONS.AUTO;
  if (arrowPosition === POSITIONS.LEFT || arrowPosition === POSITIONS.TOP) {
    placement = `${placement}-start`;
  }
  if (arrowPosition === POSITIONS.RIGHT || arrowPosition === POSITIONS.BOTTOM) {
    placement = `${placement}-end`;
  }
  return placement;
}