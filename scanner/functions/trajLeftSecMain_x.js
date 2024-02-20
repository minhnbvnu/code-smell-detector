function trajLeftSecMain_x(u,dr){

  var straightSec=lenLeftSecMain-lenLeft;  // first straight, then left turn

  var x0=center_xPhys+offset21Source-radiusLeft;
  var y0=center_yPhys+offset21Target-radiusLeft;

  var urel=u-u21Target; // long coord target relative to start of transition

  // dr=distance of target lane (left) to target road axis

  var x=(urel<straightSec) // dr=distance target lane to target road axis
      ? x0+(radiusLeft+dr)
      : x0+(radiusLeft+dr)*Math.cos((urel-straightSec)/radiusLeft);
  return x;
}