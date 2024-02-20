function expectErrorLength(...args) {
  return expect(validate(...args).validationErrors().length);
}