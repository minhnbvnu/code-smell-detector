function getWidthRangeForConfig(settings) {
  var info = getArtboardInfo(settings);
  var minAB = info[0];
  var maxAB = info[info.length - 1];
  var min, max;
  if (!minAB || !maxAB) return [0, 0];
  min = settings.min_width || minAB.effectiveWidth;
  if (maxAB.responsiveness == 'dynamic') {
    max = settings.max_width || Math.max(maxAB.effectiveWidth, 1600);
  } else {
    max = maxAB.effectiveWidth;
  }
  return [min, max];
}