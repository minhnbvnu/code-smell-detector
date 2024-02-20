function getOppositePosition(side) {
  switch (side) {
    case POSITIONS.TOP:
      return POSITIONS.BOTTOM;
    case POSITIONS.RIGHT:
      return POSITIONS.LEFT;
    case POSITIONS.BOTTOM:
      return POSITIONS.TOP;
    case POSITIONS.LEFT:
      return POSITIONS.RIGHT;
    default:
      return POSITIONS.BOTTOM;
  }
}