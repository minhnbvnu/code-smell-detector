function estimateDataLength (trace) {
  const topLevel = findMaxArrayLength(trace)
  let dimLevel = 0
  let cellLevel = 0

  // special case for e.g. parcoords and splom traces
  if (Array.isArray(trace.dimensions)) {
    dimLevel = trace.dimensions
      .map(findMaxArrayLength)
      .reduce((a, v) => a + v)
  }

  // special case for e.g. table traces
  if (isPlainObj(trace.cells)) {
    cellLevel = findMaxArrayLength(trace.cells)
  }

  return Math.max(topLevel, dimLevel, cellLevel)
}