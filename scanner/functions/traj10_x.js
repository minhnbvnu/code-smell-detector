function traj10_x(u){
  return (u<lenMergeDiverge)
    ? x10_beginDiverge+u
    : x10_beginDiverge+lenMergeDiverge
    +radiusBig*Math.sin((u-lenMergeDiverge)/radiusBig);
}