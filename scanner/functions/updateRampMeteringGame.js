function updateRampMeteringGame(time){  // game main flow
  qIn=(time<90) ? 3200/3600 :
    (time<120) ? 0/3600 :
    (time<150) ? 3300/3600 :
    (time<150) ? 0/3600 :
    (time<180) ? 3300/3600 :
    0;
  slider_qIn.value=3600*qIn;
  slider_qInVal.innerHTML=Math.round(3600*qIn)+" Fz/h";

  qOn=(time<180) ? 600./3600 : 0;  // game ramp flow
  slider_qOn.value=3600*qOn;
  slider_qOnVal.innerHTML=Math.round(3600*qOn)+" Fz/h";
}