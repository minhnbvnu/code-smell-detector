function timestampToPosition(timestamp, scaleFactor, frame) {
  return frame.origin.x + timestamp * scaleFactor;
}