function angleReflect(incidenceAngle, surfaceAngle){
  const a = surfaceAngle * 2 - incidenceAngle;
  return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
}