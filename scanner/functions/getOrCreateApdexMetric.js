function getOrCreateApdexMetric(name, scope, overrideApdex) {
  if (!name) {
    throw new Error('Metrics must be named')
  }

  const resolved = this._resolve(scope)

  if (!resolved[name]) {
    this.empty = false

    // Only use the given override to create the metric if this is not the
    // global apdex AND we have a valid value.
    const apdexT =
      name !== NAMES.APDEX && overrideApdex > 0 ? overrideApdex * FROM_MILLIS : this.apdexT
    resolved[name] = new ApdexStats(apdexT)
  }
  return resolved[name]
}