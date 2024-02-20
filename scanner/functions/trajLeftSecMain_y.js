function trajLeftSecMain_y(u,dr){
  var straightSec=lenLeftSecMain-lenLeft;
  var y0=center_yPhys+offset21Target-radiusLeft;
  var urel=u-u21Target; 
  var y=(urel<straightSec) // dr=distance target lane to target road axis
      ? y0+urel-straightSec
      : y0+(radiusLeft+dr)*Math.sin((urel-straightSec)/radiusLeft);
  return y;
}