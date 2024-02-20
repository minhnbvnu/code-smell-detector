function propsExcept() {
  const setish = I.create(null)
  for (let i = 0, n = arguments[I.LENGTH]; i < n; ++i)
    setish[arguments[i]] = 'd'
  return [disjoint(k => setish[k] || 't'), 't']
}