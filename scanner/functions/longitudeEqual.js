function longitudeEqual(actual, expected, delta) {
  actual = Math.abs(actual - expected) % 360;
  return actual <= delta || actual >= 360 - delta;
}