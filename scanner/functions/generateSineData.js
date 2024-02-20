function generateSineData(n, xval, yval, xnoise, ynoise) {
  var dx = 2 * Math.PI / n,
      x = 0,
      i = -1;
  while (++i < n) {
    xval[i] = x;
    yval[i] = Math.sin(x) + (2 * Math.random() - 1) * ynoise;
    x += dx * (1 + (2 * Math.random() - 1) * xnoise);
  }
}