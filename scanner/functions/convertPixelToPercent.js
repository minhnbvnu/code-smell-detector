function convertPixelToPercent(pixelPos, minPosition, maxPosition, direction) {
  let pct = limit(0, 1, (pixelPos - minPosition) / (maxPosition - minPosition));

  if (direction === Direction.rtl) {
    pct = 1 - pct;
  }

  return pct;
}