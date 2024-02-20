function trajRamp_x(u){ // physical coordinates
	//var xMergeBegin=traj_x(mainroadLen-straightLen);
	var xMergeBegin=traj_x(mainRampOffset+rampLen-mergeLen);
	var xPrelim=xMergeBegin+(u-(rampLen-mergeLen));
	return (u<rampLen-taperLen) 
	    ? xPrelim : xPrelim-0.05*(u-rampLen+taperLen);
}