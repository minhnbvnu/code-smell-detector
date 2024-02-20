function attemptResolve(...resolveArgs) {
  try {
    return require.resolve(...resolveArgs)
  } catch (error) {
    return null
  }
}