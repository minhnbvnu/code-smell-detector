function togglePixel(xClick, yClick) {
  // toggle amplitude and update graphics array (rows)
  var amplitude = (rows[yClick][xClick] + 1) % 3;
  rows[yClick][xClick] = amplitude;

  // update audiolet sequence

}