function getArtboardWidthRange(ab, settings) {
  var responsiveness = getArtboardResponsiveness(ab, settings);
  var w = getArtboardWidth(ab);
  var visibleRange = getArtboardVisibilityRange(ab, settings);
  if (responsiveness == 'fixed') {
    return [visibleRange[0] === 0 ? 0 : w, w];
  }
  return visibleRange;
}