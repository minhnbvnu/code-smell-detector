function isFinitePositive(val) {
  return typeof val === 'number' && isFinite(val) && val > 0;
}