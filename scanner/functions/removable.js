function removable(...ps) {
  function drop(y) {
    if (!(y instanceof Object)) return y
    for (let i = 0, n = ps[I.LENGTH]; i < n; ++i) if (I.hasU(ps[i], y)) return y
  }
  return (x, i, F, xi2yF) => F.map(drop, xi2yF(x, i))
}