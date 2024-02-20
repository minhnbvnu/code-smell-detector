function _stack(...pats) {
  pats = pats.map(pat => Array.isArray(pat) ? _sequence(...pat) : reify(pat));

  const query = state => flatten(pats.map(pat => pat.query(state)));

  return new Pattern(query);
}