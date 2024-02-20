function traj9_y(u){
  return (u>u9_beginMerge)
    ? y9_beginMerge
    : y9_beginMerge+radiusBig*(1-Math.cos((u-u9_beginMerge)/radiusBig));
}