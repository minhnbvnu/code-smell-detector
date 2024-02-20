function xyzToRGB(xyz, alpha = 1) {
  function xyzToRGBHelper(i) {
    if (i <= 0.0031308) {
      return i * 12.92;
    }

    return 1.055 * Math.pow(i, 1 / 2.4) - 0.055;
  }

  const r = xyzToRGBHelper(xyz.x * 3.2404542 - xyz.y * 1.5371385 - xyz.z * 0.4985314);
  const g = xyzToRGBHelper(xyz.x * -0.969266 + xyz.y * 1.8760108 + xyz.z * 0.041556);
  const b = xyzToRGBHelper(xyz.x * 0.0556434 - xyz.y * 0.2040259 + xyz.z * 1.0572252);
  return new ColorRGBA64(r, g, b, alpha);
}