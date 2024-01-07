function asColorLike(color) {
  if (!color) {
    return null;
  }
  if (Array.isArray(color)) {
    return toString(color);
  }
  if (typeof color === 'object' && 'src' in color) {
    return asCanvasPattern(color);
  }
  return color;
}