function pointLeftofLine(point, line){
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}