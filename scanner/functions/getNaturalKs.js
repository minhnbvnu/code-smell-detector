function getNaturalKs(xs, ys) {
  const ks = xs.map(() => 0);
  const n = xs.length - 1;
  const matrix = zerosMatrix(n + 1, n + 2);

  for (let i = 1; i < n; i++ // rows
  ) {
    matrix[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
    matrix[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
    matrix[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
    matrix[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
  }

  matrix[0][0] = 2 / (xs[1] - xs[0]);
  matrix[0][1] = 1 / (xs[1] - xs[0]);
  matrix[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));
  matrix[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
  matrix[n][n] = 2 / (xs[n] - xs[n - 1]);
  matrix[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));
  return solve(matrix, ks);
}