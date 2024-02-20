function calculatePathHash(appName, pathName, referingPathHash) {
  if (typeof referingPathHash === 'string') {
    referingPathHash = parseInt(referingPathHash, 16)
  }
  const rotated = ((referingPathHash << 1) | (referingPathHash >>> 31)) >>> 0
  const hash = getHash(appName, pathName)

  const result = (rotated ^ hash) >>> 0

  // This is a trick to pad it out to 8 chars regardless of length.
  return ('00000000' + result.toString(16)).substr(-8)
}