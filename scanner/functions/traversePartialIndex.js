function traversePartialIndex(A, xi2yA, xs, skip) {
  const {map, ap} = A
  let xsA = A.of(consExcept)
  const n = xs[I.LENGTH]
  if (map === I.sndU) {
    for (let i = 0; i < n; ++i) xsA = ap(xsA, xi2yA(xs[i], i))
    return xsA
  } else {
    const cons = consExcept(skip)
    for (let i = 0; i < n; ++i) xsA = ap(map(cons, xsA), xi2yA(xs[i], i))
    return map(consTo, xsA)
  }
}