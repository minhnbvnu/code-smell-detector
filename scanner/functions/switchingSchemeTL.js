function switchingSchemeTL(TL,qRoad,time,cycleTime,greenTime,isFixed){

  if(!(TL.type==='trafficLight')){ 
    console.log("switchingSchemeTL: error:",
		" can only switch active traffic light objects");
    return;
  }
  
  var qmax=IDM_v0/(IDM_v0*IDM_T+car_length);  // upper limit, only cars 

  var fracGreen=Math.min(qRoad/qmax, 1.);
  if(!(typeof isFixed === 'undefined')){fracGreen=greenTime/cycleTime;}
  var nCycle=Math.floor(time/cycleTime);
  var fracCycle=time/cycleTime-nCycle;
  var isGreen=(fracCycle<fracGreen);

  // do the action

  var newState=(isGreen) ? "green" : "red";
  trafficObjs.setTrafficLight(TL, newState); 

  if(false){
    console.log("switchingSchemeTLup: time=",time,
		" fracGreen=",fracGreen," nCycle=",nCycle,
		" fracCycle=",fracCycle," isGreen=",isGreen);
  }
}