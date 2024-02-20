async function eachLimit(items, fn, limit) {
  const results = []

  while (items.length) {
    const resolved = await Promise.all(items.splice(0, limit).map(fn))
    results.push(...resolved)
  }

  return results
}