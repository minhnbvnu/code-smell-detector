function traj3_y(u){
  var yMerge=y_main-0.5*laneWidth*(nLanes[0]+nLanes[3]);
  return yMerge-radius*(1-Math.cos((u-roadLen[3])/radius));
}