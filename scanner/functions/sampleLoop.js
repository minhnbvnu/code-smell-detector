function sampleLoop(agent, nativeMetrics) {
  return function loopSampler() {
    // Convert from microseconds to seconds
    const loopMetrics = nativeMetrics.getLoopMetrics()
    divideMetric(loopMetrics.usage, MICROS)

    recordCompleteMetric(agent, NAMES.LOOP.USAGE, loopMetrics.usage)
  }
}