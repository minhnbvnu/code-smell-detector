function assertClose (a, b, precision) {
  expect(a).toBeCloseTo(b, 3);
}