function requireString(value, property) {
  if (typeof value !== 'string') {
    throw new Error(`Expected a string for ${property}`);
  }
  return value;
}