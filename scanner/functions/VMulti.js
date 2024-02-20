function VMulti(M, V) {
  var Vect = new Array();
  var i = 0;
  for (;i < 4; i++) Vect[i] = M[i][0] * V[0] + M[i][1] * V[1] + M[i][2] * V[2] + M[i][3] * V[3];
  return Vect;
}