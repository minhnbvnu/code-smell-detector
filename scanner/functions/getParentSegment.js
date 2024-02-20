function getParentSegment(shim) {
  const { config } = shim.agent
  if (config.feature_flag.undici_async_tracking) {
    const resource = executionAsyncResource()

    if (!resource[symbols.parentSegment]) {
      const parent = shim.getSegment()
      resource[symbols.parentSegment] = parent
    }
    return resource[symbols.parentSegment]
  }
  return shim.getSegment()
}