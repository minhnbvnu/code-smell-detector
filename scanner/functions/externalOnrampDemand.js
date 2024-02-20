function externalOnrampDemand(time){
  qOnMax=1400./3600.;
  cycleTime=120;
  if(!(typeof uOffset === 'undefined')){
    slider_qOn.value=3600*qOn;
    slider_qOnVal.innerHTML=formd0(3600*qOn)+" Fz/h";
  }
  var returnVal=qOnMax*Math.pow(Math.sin(1*Math.PI*time/cycleTime), 4);
  //console.log("externalOnrampDemand: time=",time," demand=",returnVal);
  return qOnMax*Math.pow(Math.sin(1*Math.PI*time/cycleTime), 4);
}