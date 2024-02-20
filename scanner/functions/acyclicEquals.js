function acyclicEquals(l, r) {
  if (Object.is(l, r)) return true
  if (
    !l ||
    !r ||
    typeof l !== 'object' ||
    typeof r !== 'object' ||
    Object.getPrototypeOf(l) !== Object.getPrototypeOf(r)
  )
    return false
  const kl = Object.keys(l).sort()
  const kr = Object.keys(r).sort()
  if (kl.length !== kr.length) return false
  for (let i = 0; i < kl.length; ++i) if (kl[i] !== kr[i]) return false
  if (void 0 !== kl.find(k => !acyclicEquals(l[k], r[k]))) return false
  return true
}