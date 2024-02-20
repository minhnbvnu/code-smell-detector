function trajRight_x(u,dr){ 
  var urel=u-u20Target; // long coord target relative to start of transition

  // center of the arc for the right turn from right to right lane
  
  var x0=center_xPhys+offset20Source+radiusRight;
  var y0=center_yPhys-offset20Target-radiusRight;

  // dr=distance of target lane (right) to target road axis

  // case distinction since for veh rotation u-vehLen/2 relevant)

  var x=(urel<0)
      ? x0-(radiusRight+dr)
      : x0-(radiusRight+dr)*Math.cos(urel/radiusRight);

  if(false){
    console.log("traj0_20x: t=",time.toFixed(2),
	      " umin=",road0.trajAlt[0].umin.toFixed(1),
	      " umax=",road0.trajAlt[0].umax.toFixed(1),
	      " u=",u.toFixed(1),
		" urel=",urel," x0=",x0," traj2_x(0)=",traj2_x(0));
  }
  return x;
}