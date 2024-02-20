function _fastcat(...pats) {
  return _slowcat(...pats)._fast(pats.length);
}