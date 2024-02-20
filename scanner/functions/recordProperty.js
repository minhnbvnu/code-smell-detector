function recordProperty(spec) {
  return shim.recordMiddleware(getTest(), 'func', spec)
}