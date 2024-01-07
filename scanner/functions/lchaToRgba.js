function lchaToRgba(color) {
  const output = xyz.rgb(lchuv.xyz(color));
  output[3] = color[3];
  return output;
}