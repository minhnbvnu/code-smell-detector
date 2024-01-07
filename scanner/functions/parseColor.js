function parseColor(colorString) {
  const color = parseInt(colorString, 10);
  return isNaN(color) ? 0 : Math.min(Math.max(color, 0), 255);
}