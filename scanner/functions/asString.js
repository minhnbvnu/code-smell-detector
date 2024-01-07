function asString(color) {
  if (typeof color === 'string') {
    return color;
  }
  return toString(color);
}