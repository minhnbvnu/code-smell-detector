function traj4_y(u){
  var yDiverge=y_main-0.5*laneWidth*(nLanes[2]+nLanes[4]);
  return yDiverge-radius*(1-Math.cos(u/radius));
}