function headingRamp(u){

  var um1=0; var headingm1=0.2; // heading at ramp begin
  var u0=0.3*(rampLen-mergeLen); var heading0=0; 
  var u1=0.4*(rampLen-mergeLen); var heading1=0;
  var u2=0.5*(rampLen-mergeLen); var heading2=0.0; // 0.2;
  var u3=0.55*(rampLen-mergeLen); var heading3=0;
  var u4=0.6*(rampLen-mergeLen); var heading4=0;
  var u5=0.8*(rampLen-mergeLen); var heading5=0.25;
  var u6=1.0*rampLen-mergeLen; var heading6=0;
  var u7=rampLen-taperLen; var heading7=0;
  var u8=rampLen-0.5*taperLen; var heading8=2*nLanes_rmp*laneWidth/taperLen;
  var u9=rampLen; var heading9=0;
  var heading= (u<u0) ? headingm1 + (u-um1)/(u0-um1)*(heading0-headingm1) :
    (u<u1) ? heading0 + (u-u0)/(u1-u0)*(heading1-heading0) :
    (u<u2) ? heading1 + (u-u1)/(u2-u1)*(heading2-heading1) :
    (u<u3) ? heading2 + (u-u2)/(u3-u2)*(heading3-heading2) :
    (u<u4) ? heading3 + (u-u3)/(u4-u3)*(heading4-heading3) :
    (u<u5) ? heading4 + (u-u4)/(u5-u4)*(heading5-heading4) :
    (u<u6) ? heading5 + (u-u5)/(u6-u5)*(heading6-heading5) :
    (u<u7) ? heading6 + (u-u6)/(u7-u6)*(heading7-heading6) :
    (u<u8) ? heading7 + (u-u7)/(u8-u7)*(heading8-heading7)
    : heading8 + (u-u8)/(u9-u8)*(heading9-heading8);
  return heading;
}