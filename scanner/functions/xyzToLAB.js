function xyzToLAB(xyz) {
  function xyzToLABHelper(i) {
    if (i > ColorLAB.epsilon) {
      return Math.pow(i, 1 / 3);
    }

    return (ColorLAB.kappa * i + 16) / 116;
  }

  const x = xyzToLABHelper(xyz.x / ColorXYZ.whitePoint.x);
  const y = xyzToLABHelper(xyz.y / ColorXYZ.whitePoint.y);
  const z = xyzToLABHelper(xyz.z / ColorXYZ.whitePoint.z);
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return new ColorLAB(l, a, b);
}