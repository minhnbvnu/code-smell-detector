function requireNumber(value, property) {
  if (typeof value !== 'number') {
    throw new Error(`Expected a number for ${property}`);
  }
  return value;
}