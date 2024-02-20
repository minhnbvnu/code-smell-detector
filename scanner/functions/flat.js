function flat() {
  const r = [flatten]
  for (let i = 0, n = arguments[I.LENGTH]; i < n; ++i)
    r.push(arguments[i], flatten)
  return r
}