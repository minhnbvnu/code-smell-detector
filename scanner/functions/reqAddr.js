function reqAddr (pkgLock, name, fromAddr) {
  const lockNode = atAddr(pkgLock, fromAddr)
  const child = (lockNode.dependencies || {})[name]
  if (child) {
    return `${fromAddr}:${name}`
  } else {
    const parts = fromAddr.split(':')
    while (parts.length) {
      parts.pop()
      const joined = parts.join(':')
      const parent = atAddr(pkgLock, joined)
      if (parent) {
        const child = (parent.dependencies || {})[name]
        if (child) {
          return `${joined}${parts.length ? ':' : ''}${name}`
        }
      }
    }
    const err = new Error(`${name} not accessible from ${fromAddr}`)
    err.pkgLock = pkgLock
    err.target = name
    err.from = fromAddr
    throw err
  }
}