function CalcCross(V0, V1) {
  var Cross = new Array();
  Cross[0] = V0[1]*V1[2] - V0[2]*V1[1];
  Cross[1] = V0[2]*V1[0] - V0[0]*V1[2];
  Cross[2] = V0[0]*V1[1] - V0[1]*V1[0];
  return Cross;
}