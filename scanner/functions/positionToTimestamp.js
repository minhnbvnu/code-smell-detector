function positionToTimestamp(position, scaleFactor, frame) {
  return (position - frame.origin.x) / scaleFactor;
}