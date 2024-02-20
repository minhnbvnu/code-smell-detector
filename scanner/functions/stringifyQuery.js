function stringifyQuery(obj, ignores = []) {
  const qs = []

  for (const key in obj) {
    if (ignores.indexOf(key) > -1) {
      continue
    }
    qs.push(
      obj[key] ?
        `${encode(key)}=${encode(obj[key])}`.toLowerCase() :
        encode(key)
    )
  }

  return qs.length ? `?${qs.join('&')}` : ''
}