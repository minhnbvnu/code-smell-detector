function getPathData(path){
  return new SVGPathData(getD(path)).toAbs();
}