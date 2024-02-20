function cartesianToSpherical(x, y, z) {
  const r = Math.sqrt(x * x + y * y + z * z);
  const theta = Math.acos(z / r);
  const phi = Math.atan2(y, x);
  return { r, theta, phi };
}