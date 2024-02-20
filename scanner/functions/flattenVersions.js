function flattenVersions(packages) {
  const info = Object.create(null)
  packages.forEach((pair) => {
    const p = pair[0]
    const v = pair[1]

    if (info[p]) {
      if (info[p].indexOf(v) < 0) {
        info[p].push(v)
      }
    } else {
      info[p] = [v]
    }
  })

  return Object.keys(info)
    .map((key) => [key, info[key].join(', ')])
    .sort()
    .map((pair) => {
      try {
        return stringify(pair)
      } catch (err) {
        logger.debug(err, 'Unable to stringify package version')
        return '<unknown>'
      }
    })
}