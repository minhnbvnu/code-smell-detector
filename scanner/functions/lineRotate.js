function lineRotate(line, angle, origin){
  return line.map(point => pointRotate(point, angle, origin || lineMidpoint(line)));
}