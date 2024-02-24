function expectErrorOfTypeLength(type, ...args) {
  const errors = validate(...args).validationErrors();

  let errorCount = 0;
  errors.forEach((error) => {
    if (error.type === type) errorCount++;
  });
  return expect(errorCount);
}