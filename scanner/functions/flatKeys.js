function flatKeys(obj, prefix, arrayIdxs) {
  const keys = []
  const seen = []
  recurse(prefix || '', obj)
  return keys

  function recurse(p, o) {
    seen.push(o)

    for (const key in o) {
      if (seen.indexOf(o[key]) !== -1) {
        continue
      }

      if (o[key] instanceof Object && (arrayIdxs || !Array.isArray(o[key]))) {
        recurse(p + key + '.', o[key])
      } else {
        keys.push(p + key)
      }
    }
  }
}