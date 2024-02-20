function slowcat(...pats) {
  pats = pats.map((pat) => Array.isArray(pat) ? sequence(...pat) : reify(pat));
  const query = function(state) {
    const span = state.span;
    const pat_n = _mod(span.begin.sam(), pats.length);
    const pat = pats[pat_n];
    if (!pat) {
      return [];
    }
    const offset = span.begin.floor().sub(span.begin.div(pats.length).floor());
    return pat.withHapTime((t) => t.add(offset)).query(state.setSpan(span.withTime((t) => t.sub(offset))));
  };
  return new Pattern(query).splitQueries();
}