function branches() {
  const n = arguments[I.LENGTH]
  const template = {}
  for (let i = 0; i < n; ++i) template[arguments[i]] = identity
  return branch(template)
}