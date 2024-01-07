function clientRectForRange(textNode, startIndex, endIndex) {
  if (!rangeForMeasurement) rangeForMeasurement = document.createRange();
  rangeForMeasurement.setStart(textNode, startIndex);
  rangeForMeasurement.setEnd(textNode, endIndex);
  return rangeForMeasurement.getBoundingClientRect();
}