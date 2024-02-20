function MAdd(M1, M2) {
  var M = [[],[],[],[]];
  var i = 0;
  var j = 0;
  for (; i < 4; i++) {
    j = 0;
    for (; j < 4; j++) M[i][j] = M1[i][j] + M2[i][j];
  }
  return M;
}