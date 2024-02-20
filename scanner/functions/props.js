function props() {
  const n = arguments[I.LENGTH]
  const template = {}
  for (let i = 0, k; i < n; ++i) template[(k = arguments[i])] = k
  return pick(template)
}