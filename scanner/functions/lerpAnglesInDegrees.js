function lerpAnglesInDegrees(i, min, max) {
  if (i <= 0.0) {
    return min % 360.0;
  } else if (i >= 1.0) {
    return max % 360.0;
  }

  const a = (min - max + 360.0) % 360.0;
  const b = (max - min + 360.0) % 360.0;

  if (a <= b) {
    return (min - a * i + 360.0) % 360.0;
  }

  return (min + a * i + 360.0) % 360.0;
}