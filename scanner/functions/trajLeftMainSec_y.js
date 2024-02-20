function trajLeftMainSec_y(u,dr){ //  template for 03
  var y0=center_yPhys-offset21Target+radiusLeft;
  var urel=u-u03Target; 
  var y=(urel<0) 
      ? y0-(radiusLeft+dr)
      : y0-(radiusLeft+dr)*Math.cos(urel/radiusLeft);
  return y;
}