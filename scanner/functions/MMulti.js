function MMulti(M1, M2) {
  var M = [[],[],[],[]];
  var i = 0;
  var j = 0;
  for (; i < 4; i++) {
    j = 0;
    for (; j < 4; j++) M[i][j] = M1[i][0] * M2[0][j] + M1[i][1] * M2[1][j] + M1[i][2] * M2[2][j] + M1[i][3] * M2[3][j];
  }
  return M;
}