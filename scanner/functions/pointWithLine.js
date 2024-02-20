function pointWithLine(point, line, epsilon = 0){
  return Math.abs(cross(point, line[0], line[1])) <= epsilon;
}