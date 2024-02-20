function traj5_y(u){ 
  return traj4_y(roadLen[4])+0.5*laneWidth+radius*(1-Math.cos(u/radius));
}