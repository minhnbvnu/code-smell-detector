function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}