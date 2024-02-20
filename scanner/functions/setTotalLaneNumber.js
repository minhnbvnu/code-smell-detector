function setTotalLaneNumber(laneCountIn){
  console.log("setTotalLaneNumber: laneCountIn=",laneCountIn);
  userCanvasManip=true; // causes drawing background
  nLanes_main=(laneCountIn==1) ? 1 : (laneCountIn<=3) ? 2 : 3;
  nLanes_sec=(laneCountIn==6)
    ? 3 : ((laneCountIn==3)||(laneCountIn==5)) ? 2 : 1;
  laneCount=nLanes_main+nLanes_sec;
    
  defineGeometricVariables(nLanes_main,nLanes_sec);
  defineGeometricRoadproperties(nLanes_main,nLanes_sec);
  defineConflicts(nLanes_main,nLanes_sec,trafficRuleIndex);

  
  // sometimes ref error with active TLs on roads if the roads are redefined
  // ("new) in myRestartFunction() and the TLs just repositioned
  // by changeTrafficRules(rulesOld). It's safe to deactivate the TLs before
  // and activate them again at the new positions on the new roads
  // once constructed by myRestartFunction()

  var rulesOld=trafficRuleIndex;
  if(rulesOld==2){changeTrafficRules(0); }
  
  myRestartFunction();
  
  
  if(rulesOld==2){
    //changeTrafficRules(0);  
    changeTrafficRules(rulesOld); // changes back integer trafficRules
  }
}