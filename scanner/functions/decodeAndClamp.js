function decodeAndClamp(value, addend, coefficient, max) {
  value = addend + value * coefficient;

  if (value < 0) {
    value = 0;
  } else if (value > max) {
    value = max;
  }

  return value;
}