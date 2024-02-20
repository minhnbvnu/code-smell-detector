function saturateViaLCH(input, saturation, saturationConstant = 18) {
  const lch = rgbToLCH(input);
  let sat = lch.c + saturation * saturationConstant;

  if (sat < 0) {
    sat = 0;
  }

  return lchToRGB(new ColorLCH(lch.l, sat, lch.h));
}