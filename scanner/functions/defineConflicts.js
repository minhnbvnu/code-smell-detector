function defineConflicts(nLanes_main,nLanes_sec,trafficRuleIndex){


  if(trafficRuleIndex==0){defineConflictsPriorityRoad(nLanes_main,nLanes_sec);}
  else if(trafficRuleIndex==1){
    defineConflictsSymmetric(nLanes_main,nLanes_sec);}
  else{defineConflictsTrafficLights(nLanes_main,nLanes_sec);}
}