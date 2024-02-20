function getRangeCenteredOnIndex(length, maxRangeSize, indexToCenter) {
  const rangeSize = Math.min(length, maxRangeSize);
  const halfRangeSize = Math.floor(rangeSize / 2);
  const idealStartIndex = indexToCenter - halfRangeSize;
  const startIndex = clamp(idealStartIndex, 0, length - rangeSize);
  const endIndex = startIndex + rangeSize - 1;
  return [startIndex, endIndex];
}