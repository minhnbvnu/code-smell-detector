function testIsEqualCompatibility(value) {
  /* istanbul ignore if */
  if (Array.isArray(value)) {
    return value.every(testIsEqualCompatibility);
  }
  return value == null || /^[sbn]/.test(typeof value); // basic primitives
}