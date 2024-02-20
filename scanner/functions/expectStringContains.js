function expectStringContains(string, containing) {
  expect(string).toEqual(expect.stringContaining(containing));
}