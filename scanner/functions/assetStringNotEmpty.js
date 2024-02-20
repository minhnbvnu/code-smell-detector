function assetStringNotEmpty(str) {
  expect(!!str && typeof str === 'string').toBe(true);
}