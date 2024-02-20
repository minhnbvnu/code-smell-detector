function composed(oi0, os) {
  let n = os[I.LENGTH] - oi0
  if (n < 2) {
    return n ? toFunction(os[oi0]) : identity
  } else {
    const last = toFunction(os[oi0 + --n])
    let r = (F, xi2yF) => (x, i) => last(x, i, F, xi2yF)
    while (--n) r = composedMiddle(toFunction(os[oi0 + n]), r)
    const first = toFunction(os[oi0])
    return (x, i, F, xi2yF) => first(x, i, F, r(F, xi2yF))
  }
}