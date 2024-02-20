function whiteToAlpha(col) {
  var r = red(col);
  var g = green(col);
  var b = blue(col);

  var m = min(r, g, b);
  if (m > 0) {
    var f = m / 255;

    r = (r - 255 * f) / (1 - f);
    g = (g - 255 * f) / (1 - f);
    b = (b - 255 * f) / (1 - f);
    var a = (1 - f) * 255;

    return color(r, g, b, a);
  }
  return col;
}