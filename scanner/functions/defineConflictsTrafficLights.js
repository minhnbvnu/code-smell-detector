function defineConflictsTrafficLights(nLanes_main,nLanes_sec){
//################################################################

  setBasicConflicts(nLanes_main,nLanes_sec);

  // right

  conflicts05=[];  
  conflicts13=[];
  conflicts20=[];
  conflicts41=[];

  // straight ahead

  conflicts00=[];
  conflicts11=[];
  conflicts23=[];
  conflicts45=[];

  // traffic lights, left

  conflicts03=[conflict1_03];
  conflicts15=[conflict0_15];
  conflicts21=[conflict4_21,conflict5_21];
  conflicts40=[conflict2_40,conflict3_40]; 

  
}