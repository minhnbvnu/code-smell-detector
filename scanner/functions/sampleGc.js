function sampleGc(agent, nativeMetrics) {
  return function gcSampler() {
    const gcMetrics = nativeMetrics.getGCMetrics()

    Object.keys(gcMetrics).forEach(function forEachGCType(gcType) {
      // Convert from milliseconds to seconds.
      const gc = gcMetrics[gcType]
      divideMetric(gc.metrics, MILLIS)

      recordCompleteMetric(agent, NAMES.GC.PAUSE_TIME, gc.metrics)
      if (gc.type) {
        recordCompleteMetric(agent, NAMES.GC.PREFIX + gc.type, gc.metrics)
      } else {
        logger.debug(gc, 'Unknown GC type %j', gc.typeId)
      }
    })
  }
}