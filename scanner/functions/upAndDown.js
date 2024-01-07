function upAndDown(t) {
  if (t < 0.5) {
    return inAndOut(2 * t);
  }
  return 1 - inAndOut(2 * (t - 0.5));
}