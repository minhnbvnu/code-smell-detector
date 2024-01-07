function vecFromRange({ start, end }) {
  return end.translate(start.negate());
}