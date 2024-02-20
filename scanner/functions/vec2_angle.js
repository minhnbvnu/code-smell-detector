function vec2_angle(v) {
  if (v.dx==0) return Math.atan2(v.dx+0.01, v.dy);
  return Math.atan2(v.dx, v.dy);
}