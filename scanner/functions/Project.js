function Project(tc,p1,sx,sy) {
  var m = tc.radius * tc.z1 / (tc.z1 + tc.z2 + p1.z);
  return {
    x: p1.x * m * sx,
    y: p1.y * m * sy,
    z: p1.z,
    w: (tc.z1 - p1.z) / tc.z2
  };
}