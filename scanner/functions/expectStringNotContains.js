function expectStringNotContains(string, containing) {
  expect(string).toEqual(expect.not.stringContaining(containing));
}