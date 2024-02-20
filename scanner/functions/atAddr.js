function atAddr (pkgLock, addr) {
  if (!addr.length) { return pkgLock }
  const parts = addr.split(':')
  return parts.reduce((acc, next) => {
    return acc && (acc.dependencies || {})[next]
  }, pkgLock)
}