function genTree(toc, maxLevel) {
  const headlines = []
  const last = {}

  toc.forEach(headline => {
    const level = headline.level || 1
    const len = level - 1

    if (level > maxLevel) {
      return
    }
    if (last[len]) {
      last[len].children = (last[len].children || []).concat(headline)
    } else {
      headlines.push(headline)
    }
    last[level] = headline
  })

  return headlines
}