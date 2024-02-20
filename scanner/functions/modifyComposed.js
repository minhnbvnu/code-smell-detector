function modifyComposed(os, xi2y, x, y) {
  let n = os[I.LENGTH]
  const xs = Array(n)
  for (let i = 0, o; i < n; ++i) {
    xs[i] = x
    switch (typeof (o = os[i])) {
      case 'string':
        x = getProp(o, x)
        break
      case 'number':
        x = getIndex(o, x)
        break
      default:
        x = composed(i, os)(x, os[i - 1], I.Identity, xi2y || I.always(y))
        n = i
        break
    }
  }
  if (n === os[I.LENGTH]) x = xi2y ? xi2y(x, os[n - 1]) : y
  for (let o; 0 <= --n; )
    x = I.isString((o = os[n])) ? setProp(o, x, xs[n]) : setIndex(o, x, xs[n])
  return x
}