function requireNumberArray(value, property) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected an array for ${property}`);
  }
  const length = value.length;
  for (let i = 0; i < length; ++i) {
    if (typeof value[i] !== 'number') {
      throw new Error(`Expected an array of numbers for ${property}`);
    }
  }
  return value;
}