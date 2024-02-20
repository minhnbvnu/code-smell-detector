function hsvToRGB(hsv, alpha = 1) {
  const c = hsv.s * hsv.v;
  const x = c * (1 - Math.abs(hsv.h / 60 % 2 - 1));
  const m = hsv.v - c;
  let r = 0;
  let g = 0;
  let b = 0;

  if (hsv.h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hsv.h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hsv.h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hsv.h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hsv.h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (hsv.h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return new ColorRGBA64(r + m, g + m, b + m, alpha);
}