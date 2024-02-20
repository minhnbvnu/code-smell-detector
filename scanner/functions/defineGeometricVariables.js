function defineGeometricVariables(nLanes_main,nLanes_sec){

  // left-turning radius sufficiently high to allow for "US left-turning style"

  radiusRight=(2.0+0.5*Math.max(laneCount-3,0))*laneWidth;
  radiusLeft=1.5*radiusRight;

  offsetMain=0.5*laneWidth*nLanes_main;
  offsetSec=0.5*laneWidth*nLanes_sec;
  offset20Target=(nLanes_main-0.5)*laneWidth; // dist from inters. y center
  road0Len=mainroadLen; 
  road2Len=0.5/fitfactor*refSizePhys - offset20Target - radiusRight;
  road3Len=0.5/fitfactor*refSizePhys + offset20Target + radiusRight;

//right

  lenRight=0.5*Math.PI*radiusRight; // for all right-turn special traj
  offset20Source=(nLanes_sec-0.5)*laneWidth; // dist from inters. x center
  u20Source=1.0*road2Len;
  u20Target=0.5*mainroadLen+offset20Source+(1-0.5*Math.PI)*radiusRight;
  u13Source=0.5*mainroadLen-offset20Source-radiusRight;
  u13Target=2*(offset20Target+radiusRight)-lenRight;

//left

  lenLeft=0.5*Math.PI*radiusLeft; //main-sec
  lenLeftSecMain=lenLeft+2*offsetMain-1*(radiusLeft-radiusRight);
  
  offset21Source=0.5*laneWidth;  // dist from intersection x center
  offset21Target=0.5*laneWidth;  // dist from intersection y center
  u21Source=1.0*road2Len;
  u21Target=0.5*mainroadLen-offset21Source-(lenLeftSecMain-radiusLeft);
  //u21Target=0.5*mainroadLen-offset21Source-(lenLeft-radiusLeft);//!!
  u03Source=0.5*mainroadLen+offset21Source-radiusLeft;
  u03Target=-offset21Target+radiusLeft+radiusRight+offset20Target-lenLeft;


// dependent quantities due to symmetry

  road1Len=mainroadLen;
  road4Len=road2Len;
  road5Len=road3Len;

  u41Source=u20Source;
  u41Target=u20Target;
  u05Source=u13Source;
  u05Target=u13Target;

  u40Source=u21Source;
  u40Target=u21Target;
  u15Source=u03Source;
  u15Target=u03Target;
}