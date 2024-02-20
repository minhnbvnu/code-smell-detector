function addStartupSupportabilities(agent) {
  recordLoaderMetric(agent)
  recordNodeVersionMetric(agent)
  recordFeatureFlagMetrics(agent)
  recordSourceMapMetric(agent)
}