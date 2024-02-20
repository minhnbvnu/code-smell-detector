function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}