function insertColorIntoArray(color, targetArray, atIndex) {
  var c = new Color(color);
  targetArray[atIndex + 0] = c.red / 255;
  targetArray[atIndex + 1] = c.green / 255;
  targetArray[atIndex + 2] = c.blue / 255;
  targetArray[atIndex + 3] = c.alpha;
}