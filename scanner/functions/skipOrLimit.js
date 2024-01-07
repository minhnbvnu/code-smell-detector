function skipOrLimit(skip, value, min, max) {
  return skip ? 0 : _limitValue(value, min, max);
}