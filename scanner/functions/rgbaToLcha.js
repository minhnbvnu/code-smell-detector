function rgbaToLcha(color) {
  const output = xyz.lchuv(rgb.xyz(color));
  output[3] = color[3];
  return output;
}