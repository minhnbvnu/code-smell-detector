function boundingRectOfLine(line) {
  line = element_object(line);

  var x1 = line.x1;
  var y1 = line.y1;
  var x2 = line.x2;
  var y2 = line.y2;

  return {
    left: Math.min(x1, x2),
    top: Math.min(y1, y2),
    right: Math.max(x1, x2),
    bottom: Math.max(y1, y2),
    width: Math.abs(x1 - x2),
    height: Math.abs(y1 - y2)
  };
}