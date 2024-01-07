function getGlslSizeFromType(type) {
  if (type === ColorType) {
    return 2;
  }
  if (type === NumberArrayType) {
    return 4;
  }
  return 1;
}