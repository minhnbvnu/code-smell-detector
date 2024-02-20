function taperMerge(u,taperLen,laneWidth,rampLen){
  return taperDiverge(rampLen-u,taperLen,laneWidth);
}