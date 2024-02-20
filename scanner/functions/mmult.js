function mmult(rows, cols,  m1, m2, m3) {
  var i, j, k, val;
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      val = 0;
      for (k = 0; k < cols; k++) {
	val += m1[i][k] * m2[k][j];
      }
      m3[i][j] = val;
    }
  }
  return m3;
}