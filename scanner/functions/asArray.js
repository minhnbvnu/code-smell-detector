function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  }
  return fromString(color);
}