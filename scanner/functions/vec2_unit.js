function vec2_unit(v) {
  var m = vec2_magn(v);
  if (m == 0) return {dx:0, dy:0};
  return {dx:v.dx/m, dy:v.dy/m};
}