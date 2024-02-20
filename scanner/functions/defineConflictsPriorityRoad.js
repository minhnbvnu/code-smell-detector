function defineConflictsPriorityRoad(nLanes_main,nLanes_sec){
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
  conflicts23=[conflict0_up,conflict1_up];
  conflicts45=[conflict0_down,conflict1_down];

  // left

  conflicts03=[conflict1_03];
  conflicts15=[conflict0_15];
  conflicts21=[conflict0_21, conflict4_21,conflict5_21];
  conflicts40=[conflict1_down,conflict2_40,conflict3_40];


}