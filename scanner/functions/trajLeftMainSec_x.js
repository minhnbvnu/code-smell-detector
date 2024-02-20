function trajLeftMainSec_x(u,dr){ //  template for 03
  var x0=center_xPhys+offset21Source-radiusLeft;
  var urel=u-u03Target; 
  var x=(urel<0) 
      ? x0+urel
      : x0+(radiusLeft+dr)*Math.sin(urel/radiusLeft);
  return x;
}