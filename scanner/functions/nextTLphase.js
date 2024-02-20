function nextTLphase(i){
  if(TL[i].value=="green"){
    trafficObjs.setTrafficLight(TL[i], "red");
  }
  else{
    trafficObjs.setTrafficLight(TL[i], "green");
  }
}