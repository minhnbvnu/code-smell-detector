function RGBToHSL(r, g, b) {
  var
  min = Math.min(r, g, b),
  max = Math.max(r, g, b),
  diff = max - min,
  h = 0, s = 0, l = (min + max) / 2;

  if (diff != 0) {
    s = l < 0.5 ? diff / (max + min) : diff / (2 - max - min);

    h = (r == max ? (g - b) / diff : g == max ? 2 + (b - r) / diff : 4 + (r - g) / diff) * 60;
  }

  return [h, s, l];
}