function fastcat(...pats) {
  return slowcat(...pats)._fast(pats.length);
}