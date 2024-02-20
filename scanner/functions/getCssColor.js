function getCssColor(r, g, b, opacity) {
  var col, o;
  if (opacity > 0 && opacity < 100) {
    o = roundTo(opacity / 100, 2);
    col = 'rgba(' + r + ',' + g + ',' + b + ',' + o + ')';
  } else {
    col = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  return col;
}