function getStyleRanges(text, charMetaList) {
  var charStyle = EMPTY_SET;
  var prevCharStyle = EMPTY_SET;
  var ranges = [];
  var rangeStart = 0;
  for (var i = 0, len = text.length; i < len; i++) {
    prevCharStyle = charStyle;
    var meta = charMetaList.get(i);
    charStyle = meta ? meta.getStyle() : EMPTY_SET;
    if (i > 0 && !(0, _immutable.is)(charStyle, prevCharStyle)) {
      ranges.push([text.slice(rangeStart, i), prevCharStyle]);
      rangeStart = i;
    }
  }
  ranges.push([text.slice(rangeStart), charStyle]);
  return ranges;
}