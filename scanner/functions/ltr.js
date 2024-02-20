function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}