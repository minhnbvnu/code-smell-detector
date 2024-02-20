function mkmatrix(rows, cols) {
  var i, j, count = 1;
  var m = new Array(rows);
  for (i = 0; i < rows; i++) {
    m[i] = new Array(cols);
    for (j = 0; j < cols; j++) {
      m[i][j] = count++;
    }
  }
  return m;
}