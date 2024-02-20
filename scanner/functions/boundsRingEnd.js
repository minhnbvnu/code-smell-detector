function boundsRingEnd() {
  boundsRingPoint(lambda00, phi00);
  areaStream.lineEnd();
  if (abs(deltaSum) > epsilon) lambda0 = -(lambda1 = 180);
  range[0] = lambda0, range[1] = lambda1;
  p0 = null;
}