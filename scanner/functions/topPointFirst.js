function topPointFirst(line){
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}