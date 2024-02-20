function taperDiverge(u,taperLen,laneWidth){
  var res=
    (u<0.5*taperLen) ? laneWidth*(1-2*Math.pow(u/taperLen,2)) :
    (u<taperLen) ? 2*laneWidth*Math.pow((taperLen-u)/taperLen,2) : 0;
  return res;
}