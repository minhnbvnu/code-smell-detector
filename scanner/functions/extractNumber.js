function extractNumber(value, defaultValue) {
  if (value == null) {
    return defaultValue;
  }
  return +value;
}