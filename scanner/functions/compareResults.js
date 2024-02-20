function compareResults(base, down) {
  const delta = down.mean - base.mean
  const deltaPercent = delta / base.mean
  if (Math.abs(delta) < 0.1) {
    return deltaPercent < 100
  }
  return deltaPercent < 2
}