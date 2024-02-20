function defineGeometricRoadproperties(nLanes_main,nLanes_sec){

  var nLanes=[nLanes_main,nLanes_main,
	    nLanes_sec,nLanes_sec,nLanes_sec,nLanes_sec];
  for(var ir=0; ir<nLanes.length; ir++){
      roadImages[ir][0]=roadImgWith_lane[nLanes[ir]-1];
      roadImages[ir][1]=roadImgWithout_lane[nLanes[ir]-1];
      network[ir].nLanes=(ir<2) ? nLanes_main : nLanes_sec;
  }

  road2.roadLen=road2Len;
  road3.roadLen=road3Len;
  road4.roadLen=road4Len;
  road5.roadLen=road5Len;

// adding the alternative trajectories ([0]=right turn, [1]=left turn)
// then corresponding road drawn if road.drawAlternativeTrajectories=true
// and corresponding vehicles if their route contains the trajAlt roadID elem

  road0.trajAlt[0]={x: traj0_20x,
		  y: traj0_20y,
		  roadID: 2, // here only route 20
		  umin:u20Target,
		  umax:u20Target+lenRight,
		  laneMin:nLanes_main-1, // right main lane
		  laneMax:nLanes_main-1
		 };
  
  road0.trajAlt[1]={x: traj0_40x,
		  y: traj0_40y,
		  roadID: 4,   // route40,
		  umin:u40Target,
		  umax:u40Target+lenLeftSecMain,
		  laneMin:0, // left main lane
		  laneMax:0
		 };

  road1.trajAlt[0]={x: traj1_41x,
		  y: traj1_41y,
		  roadID: 4,   // route41,
		  umin:u41Target,
		  umax:u41Target+lenRight,
		  laneMin:nLanes_main-1, // right main lane
		  laneMax:nLanes_main-1
		 };
  
  road1.trajAlt[1]={x: traj1_21x,
		  y: traj1_21y,
		  roadID: 2,   // route21,
		  umin:u21Target,
		  umax:u21Target+lenLeftSecMain,
		  laneMin:0, // left main lane
		  laneMax:0
		 };
  

  road3.trajAlt[0]={x: traj3_13x,
		  y: traj3_13y,
		  roadID: 1,    // route13,
		  umin:u13Target,
		  umax:u13Target+lenRight,
		  laneMin:nLanes_sec-1, // right secondary lane
		  laneMax:nLanes_sec-1
		 };
  
  road3.trajAlt[1]={x: traj3_03x,
		  y: traj3_03y,
		  roadID: 0,    // route03,
		  umin:u03Target,
		  umax:u03Target+lenLeft,
		  laneMin:0, // left secondary lane
		  laneMax:0
		 };
  
  road5.trajAlt[0]={x: traj5_05x,
		  y: traj5_05y,
		  roadID: 0,     // route05,
		  umin:u05Target,
		  umax:u05Target+lenRight,
		  laneMin:nLanes_sec-1, // right secondary lane
		  laneMax:nLanes_sec-1
		 };
  
  road5.trajAlt[1]={x: traj5_15x,
		  y: traj5_15y,
		  roadID: 1,     //route15,
		  umin:u15Target,
		  umax:u15Target+lenLeft,
		  laneMin:0, // left secondary lane
		  laneMax:0
		   };
  
}