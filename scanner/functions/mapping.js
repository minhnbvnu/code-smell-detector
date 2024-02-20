function mapping(ps) {
  let n = 0
  if (I.isFunction(ps)) ps = ps.apply(null, nVars((n = ps[I.LENGTH])))
  checkPatternPairInDev(ps)
  const kinds = Array(n)
  const ms = ps.map(p => toMatch(kinds, p))
  const ss = ps.map(toSubst)
  return isoU(oneway(n, ms[0], ss[1]), oneway(n, ms[1], ss[0]))
}