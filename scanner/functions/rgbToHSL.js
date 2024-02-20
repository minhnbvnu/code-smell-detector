function rgbToHSL(rgb) {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const delta = max - min;
  let hue = 0;

  if (delta !== 0) {
    if (max === rgb.r) {
      hue = 60 * ((rgb.g - rgb.b) / delta % 6);
    } else if (max === rgb.g) {
      hue = 60 * ((rgb.b - rgb.r) / delta + 2);
    } else {
      hue = 60 * ((rgb.r - rgb.g) / delta + 4);
    }
  }

  if (hue < 0) {
    hue += 360;
  }

  const lum = (max + min) / 2;
  let sat = 0;

  if (delta !== 0) {
    sat = delta / (1 - Math.abs(2 * lum - 1));
  }

  return new ColorHSL(hue, sat, lum);
}