function wrapInBounds(min, max, value) {
  if (value < min) {
    return max;
  } else if (value > max) {
    return min;
  }

  return value;
}