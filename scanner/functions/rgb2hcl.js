function rgb2hcl(pixel) {
  const red = rgb2xyz(pixel[0]);
  const green = rgb2xyz(pixel[1]);
  const blue = rgb2xyz(pixel[2]);

  const x = xyz2lab(
    (0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / Xn,
  );
  const y = xyz2lab(
    (0.2126729 * red + 0.7151522 * green + 0.072175 * blue) / Yn,
  );
  const z = xyz2lab(
    (0.0193339 * red + 0.119192 * green + 0.9503041 * blue) / Zn,
  );

  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a);
  if (h < 0) {
    h += twoPi;
  }

  pixel[0] = h;
  pixel[1] = c;
  pixel[2] = l;

  return pixel;
}