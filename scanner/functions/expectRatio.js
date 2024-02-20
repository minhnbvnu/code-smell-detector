function expectRatio(current, min, max) {
  expect(current).toBeGreaterThanOrEqual(min);
  expect(current).toBeLessThanOrEqual(max);
}