function willFigureHang (result) {
  const data = result.figure.data

  // cap the number of traces
  if (data.length > 200) return true

  let maxPtBudget = 0

  for (let i = 0; i < data.length; i++) {
    const trace = data[i] || {}

    // cap the number of points using a budget
    maxPtBudget += estimateDataLength(trace) / maxPtsPerTrace(trace)
    if (maxPtBudget > 1) return true
  }
}