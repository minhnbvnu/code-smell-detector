function extractColor(color) {
  if (color == null) {
    return null;
  }
  var c = new Color(color);
  return [c.red / 255, c.green / 255, c.blue / 255, c.alpha];
}