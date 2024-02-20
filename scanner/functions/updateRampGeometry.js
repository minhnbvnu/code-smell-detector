function updateRampGeometry(){

  // crucial: correct x/y attachment at begin of merge 
  // (assume heading=0 @ merge for the moment)

  xRamp[nArrRamp-1]=traj_x(mainRampOffset+rampLen-mergeLen)+mergeLen;
  yRamp[nArrRamp-1]=traj_y(mainRampOffset+rampLen-mergeLen)
    -0.5*laneWidth*(nLanes_main-nLanes_rmp);

  for(var i=nArrRamp-2; i>=0; i--){
    var u=drampLen*(i+0.5);
    xRamp[i]=xRamp[i+1]-drampLen*Math.cos(headingRamp(u));
    yRamp[i]=yRamp[i+1]-drampLen*Math.sin(headingRamp(u));
  }

  //!!! necessary, since roads internal tables!

  ramp.gridTrajectories(trajRamp_x,trajRamp_y); 
  //console.log("in updateRampGeometry: nLanes_main=",nLanes_main,
//	      " trajRamp_y(rampLen-50)=",formd(trajRamp_y(rampLen-50))
//	     );

}