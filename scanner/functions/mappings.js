function mappings(ps) {
  if (I.isFunction(ps)) ps = ps.apply(null, nVars(ps[I.LENGTH]))
  return alternatives.apply(null, ps.map(mapping))
}