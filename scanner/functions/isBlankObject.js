function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}