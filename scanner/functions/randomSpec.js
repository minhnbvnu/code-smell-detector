function randomSpec() {
  const n = Math.random()
  if (n > 0.666) {
    return implicitSpec()
  } else if (n > 0.333) {
    return partialSpec()
  }
  return explicitSpec()
}