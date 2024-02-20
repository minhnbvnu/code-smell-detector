function reqOptic(o) {
  switch (typeof o) {
    case 'string':
      break
    case 'number':
      reqIndex(o)
      break
    case 'object':
      reqArray(o)
      for (let i = 0, n = o[I.LENGTH]; i < n; ++i) reqOptic(o[i])
      break
    default:
      reqFunction(o)
      break
  }
}