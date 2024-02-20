function iterSelect(xi2y, t, s) {
  while ((s = reNext(s, t))) {
    const y = xi2y(s[RE_VALUE], s[INDEX])
    if (void 0 !== y) return y
  }
}