function pure(value) {
  function query(state) {
    return state.span.spanCycles.map(subspan => new Hap(fraction(subspan.begin).wholeCycle(), subspan, value));
  }

  return new Pattern(query);
}