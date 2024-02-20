function traj7_y(u){ 
  return traj6_y(roadLen[6])-0.25*laneWidth*nLanes[6]
    -radiusBig*(1-Math.cos(u/radiusBig));
}