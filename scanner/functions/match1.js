function match1(kinds, i, e, x) {
  if (void 0 !== x) {
    if (i in e) return I.acyclicEqualsU(e[i], x)
    e[i] = x
    const k = kinds[i]
    return !k || k(x)
  }
}