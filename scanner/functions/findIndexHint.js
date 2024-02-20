function findIndexHint(hint, xi2b, xs) {
  let u = hint.hint
  const n = xs[I.LENGTH]
  if (n <= u) u = n - 1
  if (u < 0) u = 0
  let d = u - 1
  for (; 0 <= d && u < n; ++u, --d) {
    if (xi2b(xs[u], u, hint)) return u
    if (xi2b(xs[d], d, hint)) return d
  }
  for (; u < n; ++u) if (xi2b(xs[u], u, hint)) return u
  for (; 0 <= d; --d) if (xi2b(xs[d], d, hint)) return d
  return n
}