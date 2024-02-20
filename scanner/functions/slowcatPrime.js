function slowcatPrime(...pats) {
  pats = pats.map(reify);

  const query = function (state) {
    const pat_n = Math.floor(state.span.begin) % pats.length;
    const pat = pats[pat_n];
    return (pat == null ? void 0 : pat.query(state)) || [];
  };

  return new Pattern(query).splitQueries();
}