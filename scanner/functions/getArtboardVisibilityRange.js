function getArtboardVisibilityRange(ab, settings) {
  var thisWidth = getArtboardWidth(ab);
  var minWidth, nextWidth;
  // find widths of smallest ab and next widest ab (if any)
  forEach(getArtboardInfo(settings), function(info) {
    var w = info.effectiveWidth;
    if (w > thisWidth && (!nextWidth || w < nextWidth)) {
      nextWidth = w;
    }
    minWidth = Math.min(w, minWidth || Infinity);
  });
  return [thisWidth == minWidth ? 0 : thisWidth, nextWidth ? nextWidth - 1 : Infinity];
}