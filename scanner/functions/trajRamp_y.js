function trajRamp_y(u){ // physical coordinates

  var yMergeBegin=traj_y(mainRampOffset+rampLen-mergeLen)
	-0.5*laneWidth*(nLanes_main+nLanes_rmp)-0.02*laneWidth;

  var yMergeEnd=yMergeBegin+laneWidth;
  return (u<rampLen-mergeLen)
    ? yMergeBegin - 0.5*Math.pow(rampLen-mergeLen-u,2)/rampRadius
    : (u<rampLen-taperLen) ? yMergeBegin
    : yMergeBegin+taperMerge(u,taperLen,laneWidth,rampLen);
}