function expectValid(...args) {
  expect(validate(...args).isValid()).to.equal(true);
}