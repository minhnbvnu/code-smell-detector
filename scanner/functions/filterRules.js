function filterRules(rules) {
  const map = Object.create(null)

  for (let i = 0, l = rules.length; i < l; ++i) {
    let prefix = rules[i].prefix

    if (!prefix || typeof prefix !== 'string') {
      continue
    }

    if (prefix[prefix.length - 1] !== '/') {
      prefix = prefix + '/'
      rules[i].prefix = prefix
    }

    const segments = prefix.split('/')
    if (segments.length !== 3 || !segments[0] || !segments[1] || segments[3]) {
      continue
    }

    if (Array.isArray(rules[i].terms)) {
      map[prefix] = rules[i]
    }
  }

  const keys = Object.keys(map)
  const filtered = new Array(keys.length)

  for (let i = 0, l = keys.length; i < l; ++i) {
    filtered[i] = map[keys[i]]
  }

  return filtered
}