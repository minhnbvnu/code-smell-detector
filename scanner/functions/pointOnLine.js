function pointOnLine(point, line, epsilon = 0){
  const l = lineLength(line);
  return pointWithLine(point, line, epsilon) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
}