function requireSizeLike(value, property) {
  if (typeof value === 'number') {
    return value;
  }
  return requireSize(value, property);
}