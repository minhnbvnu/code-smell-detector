function changeTrafficRules(ruleIndex){
  trafficRuleIndex=ruleIndex;
  defineConflicts(nLanes_main,nLanes_sec,trafficRuleIndex);

  // for right priority, too much traffic leads to grid lock;
  // furthermore, only 1/1 lane sensible 
  
  if(false){ 
  //if(trafficRuleIndex==1){ 
    setTotalLaneNumber(2);
    qIn=180./3600;
    q2=110./3600;
    setSlider(slider_qIn, slider_qInVal, 3600*qIn, commaDigits, "veh/h");
    setSlider(slider_q2, slider_q2Val, 3600*q2, commaDigits, "veh/h");
  }
  
  if(trafficRuleIndex==2){ // traffic lights
    nextTLphase(); // to bring traffic lights in defined state: 2 green/red


    trafficObjs.dropObject(TL[0],network,
		       network[0].traj[0](u05Source),
		       network[0].traj[1](u05Source),
		       20,);
    trafficObjs.dropObject(TL[1],network,
		       network[1].traj[0](u05Source),
		       network[1].traj[1](u05Source),
		       20,);
    trafficObjs.dropObject(TL[2],network,
		       network[2].traj[0](u20Source),
		       network[2].traj[1](u20Source),
		       20,);
    trafficObjs.dropObject(TL[3],network,
		       network[4].traj[0](u20Source),
		       network[4].traj[1](u20Source),
			   20,);
  }
  else{
    for(var i=0; i<4; i++){
      trafficObjs.deactivate(TL[i]);
      //TL[i].inDepot=true;
    }
  }
  console.log("end changeTrafficRules: trafficRuleIndex=",trafficRuleIndex);
}