function defineConflictsSymmetric(nLanes_main,nLanes_sec){
//###########################################################
  
  setBasicConflicts(nLanes_main,nLanes_sec);
  
  // conflict2_00,conflic3_00 not yet defined, also not connect to itself
  // in actual simulation

  // right

  conflicts05=[];  
  conflicts13=[];
  conflicts20=[];
  conflicts41=[];

  // straight ahead (symmetric right priority)

  conflicts00=[conflict2_00,conflict3_00];
  conflicts11=[conflict4_11,conflict5_11];
  conflicts23=[conflict1_up];
  conflicts45=[conflict0_down];

  // left

  conflicts03=[conflict1_03,conflict2_03];
  conflicts15=[conflict0_15,conflict4_15];
  conflicts21=[conflict4_21,conflict5_21];
  conflicts40=[conflict2_40,conflict3_40]; 
  
}