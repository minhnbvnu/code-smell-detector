function selectInArrayLike(xi2v, xs) {
  for (let i = 0, n = xs[I.LENGTH]; i < n; ++i) {
    const v = xi2v(xs[i], i)
    if (void 0 !== v) return v
  }
}