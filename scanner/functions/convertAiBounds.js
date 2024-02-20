function convertAiBounds(rect) {
  var x = rect[0],
      y = -rect[1],
      w = Math.round(rect[2] - x),
      h = -rect[3] - y;
  return {
    left: x,
    top: y,
    width: w,
    height: h
  };
}