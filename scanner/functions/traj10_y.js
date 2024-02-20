function traj10_y(u){
  return (u<lenMergeDiverge)
    ? y10_beginDiverge
    : y10_beginDiverge-radiusBig*(1-Math.cos((u-lenMergeDiverge)/radiusBig));
}