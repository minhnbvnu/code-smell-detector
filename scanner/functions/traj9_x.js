function traj9_x(u){
  return (u>u9_beginMerge)
    ? x9_beginMerge+u-u9_beginMerge
    : x9_beginMerge+radiusBig*Math.sin((u-u9_beginMerge)/radiusBig);
}