function recordFunc(spec) {
  return shim.recordMiddleware(getTest().func, spec)
}